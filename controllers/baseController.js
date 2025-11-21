const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

baseController.buildError = async function (req, res) {
  const error = fakeRoute.null
  res.render("index", { title: "Server Error", error })
}

module.exports = baseController