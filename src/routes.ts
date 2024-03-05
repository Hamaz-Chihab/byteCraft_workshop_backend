import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/midleware";
import {
  logoutMiddleware,
  editMiddleware,
  createNewStudent,
  createNewCourse,
  deleteStudent,
  editStudent,
  getStudents,
} from "./handlers/admin"; // import {
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
router.post("/admin/logout", handleInputErrors, logoutMiddleware);
router.put(
  "/admin/edit/:id",
  body("name").optional().isString(),
  body("surname").optional().isString(),
  body("phoneNumber").optional().isString(), // Enforce string for phone number
  body("photoUrl").optional().isString(),
  editMiddleware
);
router.post("/admin/course", handleInputErrors, createNewCourse);
router.post("/admin/student", handleInputErrors, createNewStudent);
router.delete("/admin/student/:id", handleInputErrors, deleteStudent);
router.put("/admin/student/:id", handleInputErrors, editStudent);
// Page: The value of the page parameter is 2. This indicates that the user is requesting the second page of results.
// Limit: The value of the limit parameter is 20. This specifies that the user wants the API to return a maximum of 20 students per page.
// EX :http://localhost:3000/admin/students/bf4db169-eda9-49c8-9df9-32072a4a0db7&page=2&limit=20
router.get("/admin/students", handleInputErrors, getStudents);

export default router;
