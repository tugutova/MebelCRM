const express = require('express');

const router = express.Router();

const {
    checkUserAndCreateSession, authRender, adminRender,
    destroySession, assemblerRender, checkAssemblerAndCreateSession,
} = require('../controllers/authController');

router.get('/', authRender);
router.get('/auth/admin', adminRender);
router.post('/auth/admin', checkUserAndCreateSession);
router.get('/auth/assembler', assemblerRender);
router.post('/auth/assembler', checkAssemblerAndCreateSession);
router.get('/auth/logout', destroySession);
// router.get('/', destroySession);

module.exports = router;
