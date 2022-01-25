const nodemailer = require('nodemailer');
const {
  Assembler, Order, File, Brigade, Administrator,
} = require('../db/models');

exports.email = async (req, res, next) => {
  const administrators = await Administrator.findAll();

  administrators.forEach(async (admin) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'mebelmebel545@gmail.com',
        pass: 'mebel12345%%%',
      },
    });

    await transporter.sendMail({
      from: '"Уведомление от мастера" <mebelmebel545@gmail.com>',
      to: admin.email,
      subject: `Отчет по заказу №${req.params.order} отправлен! ✔`,
      text: `Отчет по заказу №${req.params.order} отправлен!`,
    });
  });
  next();
};
