const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
*  Classification Data Validation Rules
* ********************************* */
validate.classificationRules = () => {
    return [
        // classification_name is required and must be alphabetic characters only
        body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Classification name is required.")
        .matches(/^[a-zA-Z]+$/)
        .withMessage("Classification name can only contain alphabetic characters."),
    ]
}

/*  **********************************
*  Inventory Data Validation Rules
* ********************************* */
validate.inventoryRules = () => {
    return [
        // classification_id is required
        body("classification_id")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Classification is required."),

        // make is required and must be string
        body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a valid make name."),

        // model is required and must be string
        body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a valid model name."),

        // year is required and must be 4 digit number
        body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 4, max: 4 })
        .isNumeric()
        .withMessage("Please provide a 4-digit year."),

        // description is required
        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a description."),

        // image path is required
        body("inv_image")
        .trim()
        .notEmpty()
        .withMessage("Please provide an image path."),

        // thumbnail path is required
        body("inv_thumbnail")
        .trim()
        .notEmpty()
        .withMessage("Please provide a thumbnail path."),

        // price is required and must be decimal
        body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .isDecimal()
        .withMessage("Please provide a valid price."),

        // miles is required and must be integer
        body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage("Please provide valid mileage."),

        // color is required
        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a color."),
    ]
}

/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "New Vehicle Type Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

/* ******************************
 * Check data and return errors or continue to add inventory
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationSelect = await utilities.buildClassificationList(classification_id)
        res.render("inventory/add-inventory", {
            errors,
            title: "Add New Vehicle",
            nav,
            classificationSelect,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color
        })
        return
    }
    next()
}

module.exports = validate