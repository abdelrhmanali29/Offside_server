const express = require("express");
const matchContorller = require("./match.controller");
const router = express.Router();

router
  .route("/")
  .post(matchContorller.postMatch)
  .get(matchContorller.getAllMatchs);

router
  .route("/:id")
  .delete(matchContorller.deleteMatch)
  .patch(matchContorller.patchMatch);

module.exports = router;
