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
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/add-classification", utilities.handleErrors(invController.buildNewClassification));
router.post("/add-classification", 
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification));

// Route to add new vehicle
router.get("/add-vehicle", utilities.handleErrors(invController.buildNewInventory));
router.post("/add-vehicle", 
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory));
    
// get inventory list management view
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// edit inventory view
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView));

// submit inventory edit
router.post("/update/",
  invValidate.checkUpdateData,
  invValidate.inventoryRules(),
  utilities.handleErrors(invController.updateInventory));

module.exports = router;