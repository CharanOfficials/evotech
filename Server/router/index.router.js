import express from "express";
import UserController from "../controller/user.controller.js";
import SurveyController from "../controller/survey.controller.js";
import validateAdmin from "../midlleware/vAdmin.middleware.js";
const router = express.Router();
const userController = new UserController();
const surveyController = new SurveyController();
router.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
router.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
router.get("/survey/:id", (req, res) => {
  surveyController.retriveSurvey(req, res);
});
router.post("/survey", (req, res) => {
  surveyController.submitSurvey(req, res);
});
router.post("/logout", (req, res) => {
  userController.postLogout(req, res);
});
export default router;
