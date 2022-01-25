// const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const {
  Assembler, Order, File, Brigade, Administrator, Report, Photo,
} = require('../db/models');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

exports.adminMenu = (req, res) => {
  res.render('menu-admin');
};

exports.assemblers = async (req, res) => {
  try {
    const assemblers = await Assembler.findAll();
    res.render('all-assemblers', { assemblers });
  } catch (error) {
    console.log(error.message);
  }
};

exports.showAssembler = async (req, res) => {
  try {
    const id = req.params.assembler;
    const assembler = await Assembler.findOne({ where: { id } });
    res.render('assembler', { assembler });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAssemblerEditForm = async (req, res) => {
  try {
    const id = req.params.assembler;
    const assembler = await Assembler.findOne({ where: { id } });
    // const order = await Order.findOne({ where: { id: req.params.order } });
    const assemblerBrigade = await Brigade.findOne({ where: { id: assembler.brigade_id } });
    const otherBrigades = await Brigade.findAll(
      { where: { id: { [Op.not]: assembler.brigade_id } } },
    );
    res.render('edit-form-assambler', { assembler, assemblerBrigade, otherBrigades });
  } catch (error) {
    console.log(error.message);
  }
};

exports.editAssembler = async (req, res) => {
  try {
    const id = req.params.assembler;
    const {
      name, last_name, email, phone, brigade_id,
    } = req.body;
    await Assembler.update({
      name,
      last_name,
      email,
      phone,
      brigade_id,
    }, { where: { id } });
    res.redirect(`/admin/assemblers/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

exports.changeAssebmlerPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await hashPassword(password);
    await Assembler.update({
      password: hashedPassword,
    }, { where: { id: req.params.assembler } });
    res.redirect(`/admin/assemblers/${req.params.assembler}`);
  } catch (error) {
    res.send(error);
  }
};

exports.deleteAssembler = async (req, res) => {
  try {
    const id = req.params.assembler;
    const assembler = await Assembler.findOne({ where: { id } });
    await assembler.destroy();
    res.redirect('/admin/assemblers');
  } catch (error) {
    console.log(error.message);
  }
};

exports.newAssembler = async (req, res) => {
  const brigades = await Brigade.findAll();
  res.render('new-assembler', { brigades });
};

exports.createAssembler = async (req, res) => {
  try {
    const {
      name, last_name, email, password, phone, brigade_id,
    } = req.body;
    const hashedPassword = await hashPassword(password);
    await Assembler.create({
      name, last_name, email, password: hashedPassword, phone, brigade_id, role: 1,
    });
    res.redirect('/admin/assemblers');
  } catch (error) {
    console.log(error.message);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [{ model: File }] });
    orders.forEach(order => {
      if (order.status === 'выполнен') {
        order.isCompleted = true;
      }
      if (order.status === 'новый' || order.status === 'принят в работу') {
        order.isActive = true;
      }
    });
    res.render('all-orders', { orders });
  } catch (error) {
    console.log(error.message);
  }
};

exports.newOrder = async (req, res) => {
  const brigades = await Brigade.findAll();
  const admin = await Administrator.findOne();
  res.render('create-order', { brigades, admin });
};

exports.createOrder = async (req, res) => {
  try {
    const {
      brigade_id, administrator_id, date, time,
      address, contract, comment,
    } = req.body;
    const order = await Order.create({
      brigade_id,
      administrator_id,
      date,
      time,
      address,
      contract,
      comment,
      status: 'новый',
    });
    const { filename } = req.file;
    await File.create({ order_id: order.id, link: `${filename}` }); // Вместо ссылки сохраняем имя файла
    res.redirect('/admin/orders');
  } catch (error) {
    res.render('error', { error });
  }
};

exports.showOrder = async (req, res) => {
  const order = await Order.findOne({ where: { id: req.params.order } });
  if (order.status === 'отменен' || order.status === 'выполнен') {
    order.isCancelled = true;
  }
  res.render('order-admin', { order });
};

exports.searchOrderByContract = async (req, res) => {
  const contract = req.body.contract_id;
  const order = await Order.findOne({ where: { contract } });
  res.redirect(`/admin/orders/${order.id}`);
};

exports.getOrderEditForm = async (req, res) => {
  const order = await Order.findOne({ where: { id: req.params.order } });
  const chosenBrigade = await Brigade.findOne({ where: { id: order.brigade_id } });
  const otherBrigades = await Brigade.findAll({ where: { id: { [Op.not]: order.brigade_id } } });
  res.render('order-edit-form', { order, otherBrigades, chosenBrigade });
};

exports.editOrder = async (req, res) => {
  const {
    brigade_id, date, time, address, comment,
  } = req.body;
  await Order.update({
    brigade_id,
    date,
    time,
    address,
    comment,
  }, { where: { id: req.params.order } });
  const order = await Order.findOne({ where: { id: req.params.order } });
  res.redirect(`/admin/orders/${order.id}`);
};

exports.cancelOrder = async (req, res) => {
  const orderID = req.params.order;
  await Order.update({
    status: 'отменен',
  }, { where: { id: orderID } });
  res.redirect(`/admin/orders/${orderID}`);
};

exports.showReport = async (req, res) => {
  const orderID = req.params.order;
  const report = await Report.findOne({ where: { order_id: orderID } });
  const photos = await Photo.findAll({ where: { report_id: report.id } });
  res.render('reportForAdmin', { report, photos });
};
