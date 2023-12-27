import SurveyForm from "../model/survey.js";
// import jwt from 'jsonwebtoken'
export default class SurveyController {
  async submitSurvey(req, res) {
    try {
      const { name, gender, email, contact, address, message, nationality } =
        req.body;
      if (
        !name ||
        !email ||
        !gender ||
        !contact ||
        !address ||
        !message ||
        !nationality
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid data." });
      }
      const survey = {
        name: name,
        email: email,
        gender: gender,
        nationality: nationality,
        contactNo: contact,
        address: address,
        message: message,
      };
      const newSurvey = await SurveyForm.create(survey);
      return res
        .status(200)
        .json({ success: true, message: "Survey Submitted" });
    } catch (err) {
      console.log("Error while submitting the survey", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
  async retriveSurvey(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ status: false, message: "Invalid Id" });
      }
      const survey = await SurveyForm.findById(id);
      res.status(200).json({ success: true, data: survey });
    } catch (err) {
      console.log("Error while getting the survey", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
  async surveys(req, res) {
    try {
      const surveys = await SurveyForm.find({});
      res.status(200).json({ success: true, data: surveys });
    } catch (err) {
      console.log("Error while getting all the surveys", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
}
