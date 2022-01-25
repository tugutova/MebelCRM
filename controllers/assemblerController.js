/* eslint-disable no-param-reassign */
// const { Op } = require('sequelize');
const { Order, Report, Photo } = require('../db/models');
require('dotenv').config();

// функция возвращает список ОТКРЫТЫХ заказов данной бригады
const makeOpenOrdersList = async (req) => {
  const assembler = req.session.user;
  const openOrdersList = await Order.findAll({
    raw: true,
    where: {
      // brigade_id: assembler.brigade_id,
      status: ['новый', 'принят в работу'],
    },
    order: ['id'],
  });
  return openOrdersList;
};

// функция возвращает список ЗАКРЫТЫХ заказов данной бригады
const makeClosedOrdersList = async (req) => {
  const assembler = req.session.user;
  const closedOrdersList = await Order.findAll({
    raw: true,
    where: {
      brigade_id: assembler.brigade_id,
      status: ['выполнен', 'отменен'],
    },
    order: ['id'],
  });
  return closedOrdersList;
};

// формирует список всех заказов данной бригады,
// помечает каждый подтвержденный открытый заказ как принятый в работу
const makeOrderListAndConfirm = async (req) => {
  const openOrdersList = await makeOpenOrdersList(req);
  const closedOrdersList = await makeClosedOrdersList(req);
  openOrdersList.forEach((element) => {
    if (element.status === 'принят в работу') {
      element.isConfirmed = true;
    }
  });
  return { openOrdersList, closedOrdersList };
};

// отображает список всех заказов данной бригады
exports.showOrderList = async (req, res, next) => {
  const orderList = await makeOrderListAndConfirm(req);
  res.render('orderlistForAssembler', orderList);
};

// подтвердить - принять заказ в работу, обновить статус заказа в базе данных.
exports.confirmOrder = async (req, res) => {
  try {
    await Order.update({ status: 'принят в работу' }, { where: { id: req.params.order } });
  } catch (error) {
    return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
  }
  res.redirect('/assembler');
};

// переход на форму для создания отчета
exports.createReportForm = async (req, res) => {
  const orderID = req.params.order;
  res.render('orderReportCreate', { orderID });
};

// отправляет отчет в БД
exports.sendReport = async (req, res) => {
  const assembler = req.session.user;
  const {
    factoryFault,
    managerFault,
    assemblerFault,
    assemblyActSigned,
    customerPresenceAtAssembly,
  } = req.body;

  const report = await Report.create({
    brigade_id: assembler.brigade_id,
    assembler_id: assembler.id,
    order_id: req.params.order,
    factoryFault,
    managerFault,
    assemblerFault,
    assemblyActSigned,
    customerPresenceAtAssembly,
  });

  // создаём записи в Photo
  req.files.forEach(async (file) => await Photo.create(
    { report_id: report.id, link: `${file.originalname}` },
  ));
  // Вместо ссылки сохраняем имя файла
  await Order.update({ status: 'выполнен' }, { where: { id: req.params.order } });

  res.redirect('/assembler');
};
