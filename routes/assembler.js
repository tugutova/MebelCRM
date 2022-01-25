const express = require('express');
const multer = require('multer'); // библиотека для загрузки док-ов локально

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/tmp2/my_uploads');
  },
  filename(req, file, cb) {
    const regexp = /\.\w{1,5}$/mg // расширение файла с точкой(пр: .jpg )
    cb(null, `${file.fieldname}-${Date.now()}${file.originalname.match(regexp)[0]}`);
  },
});
const upload = multer({ storage });

const {
  showOrderList,
  confirmOrder,
  createReportForm,
  sendReport,
} = require('../controllers/assemblerController');
const { checkOrderStatus } = require('../middleware/assemblerReportCheck');
const { checkAuthForAssembler } = require('../middleware/auth');
const { email } = require('../middleware/email');

const router = express.Router();

router.get('/', checkAuthForAssembler, showOrderList);

router.get('/:order', checkAuthForAssembler, confirmOrder);

router.get('/:order/report/create', checkAuthForAssembler, checkOrderStatus, createReportForm);

router.post('/:order/report', upload.array('photo', 5), email, sendReport);

module.exports = router;
