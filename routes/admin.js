const express = require('express');
const multer = require('multer'); // библиотека для загрузки док-ов локально

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/tmp/my_uploads');
  },
  filename(req, file, cb) {
    const regexp = /\.\w{1,5}$/mg // расширение файла с точкой(пр: .jpg )
    cb(null, `${file.fieldname}-${Date.now()}${file.originalname.match(regexp)[0]}`);
  },
});
const upload = multer({ storage });

const {
  adminMenu, assemblers, createAssembler, showAssembler,
  newAssembler, getAssemblerEditForm, editAssembler, deleteAssembler,
  getOrders, newOrder, createOrder, searchOrderByContract,
  getOrderEditForm, editOrder, showOrder, cancelOrder, changeAssebmlerPassword,
  showReport,
} = require('../controllers/adminController');
const { checkAuthForAdministrator } = require('../middleware/auth');

const router = express.Router();

router.get('/', checkAuthForAdministrator, adminMenu);
router.get('/assemblers', checkAuthForAdministrator, assemblers);
router.get('/assemblers/new', checkAuthForAdministrator, newAssembler);
router.post('/assemblers', createAssembler);
router.get('/assemblers/:assembler', checkAuthForAdministrator, showAssembler);
router.get('/assemblers/:assembler/edit', checkAuthForAdministrator, getAssemblerEditForm);
router.post('/assemblers/:assembler/edit', editAssembler);
router.post('/assemblers/:assembler', deleteAssembler);
router.post('/assemblers/:assembler/edit/changepassword', changeAssebmlerPassword);

router.get('/orders', checkAuthForAdministrator, getOrders);
router.get('/orders/create', checkAuthForAdministrator, newOrder); // не по REST, наверное лучше /orders/new
router.post('/orders', checkAuthForAdministrator, upload.single('photo'), createOrder);
router.post('/orders/searchbycontract', searchOrderByContract);
router.get('/orders/:order/edit', checkAuthForAdministrator, getOrderEditForm); // не по REST, подумать над ручкой
router.get('/orders/:order', checkAuthForAdministrator, showOrder);
router.post('/orders/:order', editOrder);
router.post('/orders/:order/cancel', cancelOrder);
router.get('/orders/:order/report', showReport);

module.exports = router;
