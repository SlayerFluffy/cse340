const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null
  })
}

invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventory_id
  const data = await invModel.getInventoryByInventoryId(inventory_id)
  const grid = await utilities.buildVehicleViewGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_make + " " + data[0].inv_model
  res.render("./inventory/detail", {
    title: className,
    nav,
    grid,
    errors: null
  })
}

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management",
    nav,
    errors: null
  })
}

invCont.buildNewClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "New Vehicle Type Classification",
    nav,
    errors: null
  })
}

/* ****************************************
 *  Process Classification addition
 * *************************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body

  const addResult = await invModel.postNewClassification(
    classification_name
  )

  if (addResult) {
    // Get fresh navigation data AFTER adding the classification
    let nav = await utilities.getNav()
    req.flash(
      "notice",
      `The ${classification_name} classification was successfully added.`
    )
    res.status(201).render("inventory/add-classification", {
      title: "New Vehicle Type Classification",
      nav,
      errors: null,
    })
  } else {
    // Get navigation data for error case
    let nav = await utilities.getNav()
    req.flash("notice", "Sorry, the classification addition failed.")
    res.status(501).render("inventory/add-classification", {
      title: "New Vehicle Type Classification",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
 * Build and process add inventory view
 * *************************************** */
invCont.buildNewInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationSelect,
    errors: null
  })
}

/* ****************************************
*  Process inventory addition
* *************************************** */
invCont.addInventory = async function (req, res) {
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body

  const addResult = await invModel.postNewInventory(
    classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
  )

  if (addResult) {
    // Get fresh navigation data AFTER adding the inventory
    let nav = await utilities.getNav()
    req.flash(
      "notice",
      `The ${inv_year} ${inv_make} ${inv_model} was successfully added to inventory.`
    )
    res.status(201).render("inventory/management", {
      title: "Management",
      nav,
      errors: null,
    })
  } else {
    // Get navigation and classification data for error case
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    req.flash("notice", "Sorry, the inventory addition failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      errors: null,
    })
  }
}


module.exports = invCont