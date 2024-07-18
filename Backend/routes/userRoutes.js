import express from "express";
import {
  forgetPassword,
  getDetail,
  login,
  logout,
  register,
  resetPassword,
} from "../Controller/usercontroller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").post(isAuthenticated, getDetail);

//ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

//ResetPassword
router.route("/resetpassword/:token").put(isAuthenticated, resetPassword);
//Logout
router.route("/logout").get(logout);

export default router;
