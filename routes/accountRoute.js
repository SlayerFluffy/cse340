// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

// Routes
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManager))

router.get("/login", utilities.handleErrors(accountController.buildLogin));

router.post("/login", regValidate.loginRules(), regValidate.checkLoginData, utilities.handleErrors(accountController.accountLogin));

router.get("/register", utilities.handleErrors(accountController.buildRegister));

router.post('/register', regValidate.registrationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount));

router.get("/logout", utilities.handleErrors(accountController.accountLogout));

router.get("/update", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdate));

router.post("/update-account", 
  regValidate.accountUpdateRules(), 
  regValidate.checkAccountUpdateData, 
  utilities.handleErrors(accountController.updateAccount));

router.post("/update-password", 
  regValidate.passwordUpdateRules(), 
  regValidate.checkPasswordUpdateData, 
  utilities.handleErrors(accountController.updatePassword));


module.exports = router;