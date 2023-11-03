const router = require('express').Router();

const authController = require('../../controllers/admin/authController');
const { upload } = require('../../controllers/uploadController');

router
    .route('/login')
    .get(authController.getLogin)
    .post(authController.postLogin);

router.get('/logout', authController.logout);

router
    .route('/forgot')
    .get(authController.getForgot)
    .post(authController.postForgot);

router
    .route('/reset')
    .get(authController.getReset)
    .post(authController.postReset);

<<<<<<< HEAD
router.post('/auth', authController.authenticate);
=======
// router.post('/auth', authController.authenticate);
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b

router.use(authController.checkAdmin);

router.get('/', authController.getDashboard);

router
    .route('/profile')
    .get(authController.getProfile)
    .post(upload.single('image'), authController.postProfile);

router
    .route('/changepass')
    .get(authController.getChangePass)
    .post(authController.postChangePass);


module.exports = router;
