const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { catchErrors } = require("../handlers/errorHandlers");

router.post("/register", catchErrors(authController.register));

router.use("*", (req, res) =>
  res.status(404).json({
    error: "Endpoint does not exist"
  })
);

module.exports = router;
