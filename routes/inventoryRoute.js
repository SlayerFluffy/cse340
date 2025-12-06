// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build individual vehicle view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));

// Route to add new vehicle classification
router.get("/", utilities.checkAuthority, utilities.handleErrors(invController.buildManagement));
router.get("/add-classification", utilities.checkAuthority, utilities.handleErrors(invController.buildNewClassification));
router.post("/add-classification",
  utilities.checkAuthority,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification));

// Route to add new vehicle
router.get("/add-vehicle", utilities.checkAuthority, utilities.handleErrors(invController.buildNewInventory));
router.post("/add-vehicle", utilities.checkAuthority,
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory));
    
// get inventory list management view
router.get("/getInventory/:classification_id", utilities.checkAuthority, utilities.handleErrors(invController.getInventoryJSON));

// edit inventory view
router.get("/edit/:inv_id", utilities.checkAuthority, utilities.handleErrors(invController.editInventoryView));

// submit inventory edit
router.post("/update/",
  utilities.checkAuthority,
  invValidate.checkUpdateData,
  invValidate.inventoryRules(),
  utilities.handleErrors(invController.updateInventory));

// delete inventory get and post views
router.get("/delete/:inv_id", utilities.checkAuthority, utilities.handleErrors(invController.deleteInventoryView));
router.post("/delete/",
  utilities.checkAuthority,
  utilities.handleErrors(invController.deleteInventory));

module.exports = router;