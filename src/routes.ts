import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/midleware";
import { logoutMiddleware, editMiddleware } from "./handlers/admin"; // import {
//   createProduct,
//   deleteProduct,
//   getAllProducts,
//   getOneProduct,
//   updateProduct,
// } from "./handlers/product";
// import {
//   createUpdate,
//   deleteUpdate,
//   getOneUpdate,
//   getUpdates,
//   updateUpdate,
// } from "./handlers/update";

const router = Router();

//admin routes :
router.post("admin/logout", handleInputErrors, logoutMiddleware);
router.put(
  "/admin/edit/:id",
  body("name").optional().isString(),
  body("surname").optional().isString(),
  body("phoneNumber").optional().isString(), // Enforce string for phone number
  body("photoUrl").optional().isString(),
  editMiddleware
);
// name: name ? name : null,
// surname: surname ? surname : null,
// phoneNumber: phoneNumber ? phoneNumber : null,
// photoUrl: photoUrl ? photoUrl : null,
export default router;
