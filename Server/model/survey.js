import mongoose from "mongoose";

const surveyFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    nationality: String,
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 12,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SurveyForm = mongoose.model("Survey", surveyFormSchema);
export default SurveyForm;
