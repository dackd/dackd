const express = require("express");
const router = express.Router();
const {
  handleViewIndex,
  handleCreateUrl,
  handleRedirect,
} = require("../controllers/Url.controller");

// router.route('/').get(handleViewIndex).post(handleCreateUrl)

router.get("/", handleViewIndex);

router.post("/", handleCreateUrl);

router.get("/:shortCode", handleRedirect);

module.exports = router;
