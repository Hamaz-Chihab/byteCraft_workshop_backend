import express from "express";
import morgan from "morgan";
import router from "./routes";
import { handleInputErrors } from "./modules/midleware";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { protect } from "./modules/auth";
import { createNewAdmin, signin } from "./handlers/admin";
import { check, validationResult } from "express-validator";
const app = express();
const customLogger = (message) => (res, req, next) => {
  console.log("hello forn ${message}");
  next();
};
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const signupValidationRules = [
  check("email").isEmail().withMessage("email must be a valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least  8 characters long"),
];

app.post(
  "/signup",
  signupValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  handleInputErrors,
  createNewAdmin
);
app.post(
  "/signin",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password").not().isEmpty(),
  handleInputErrors,
  signin
);
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized request" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalide input" });
  } else {
    res.status(500).json({ message: "oops , thats on us " });
  }
  console.log(err.stack);
  res.status(500).send("something Broke !");
});

app.use("/", protect, router); // by adding 'protect' we use auth in the routes

export default app;
