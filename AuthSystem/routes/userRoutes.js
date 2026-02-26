const express = require('express');
const router = express.Router();
const {test, studentController, adminController} = require('../controllers/userController')
const {auth} = require('../middlewares/auth');
const {isStudent} = require('../middlewares/isStudent');
const {isAdmin} = require('../middlewares/isAdmin');
const {authorize} = require('../middlewares/authorize');

router.get('/test', auth, test);
router.get('/student', auth, isStudent, studentController);
router.get('/admin', auth, isAdmin, adminController)

module.exports = router;