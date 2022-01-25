const { Order } = require('../db/models');

exports.checkOrderStatus = async (req, res, next) => {
  const order = await Order.findOne({
    raw: true,
    where: {
      id: req.params.order,
    },
  });
  if (order.status === 'принят в работу') next();
  else res.redirect('/assembler');
};
