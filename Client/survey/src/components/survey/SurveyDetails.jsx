import React, { useEffect, useState } from "react";
import { surveyState } from "../../context/survey.provider";
import axios from "axios";
import { BACKEND_URL } from "../../../environment";
import { Box } from "@chakra-ui/react";
const SurveyDetails = () => {
  const { selectedSurvey } = surveyState();
  const [survey, setSurvey] = useState("");
  useEffect(() => {
    const getSurvey = async () => {
      const url = BACKEND_URL;
      const { data } = await axios.get(`${url}/survey/${selectedSurvey}`);
      setSurvey(data.data);
    };
    getSurvey();
  }, [selectedSurvey]);
  return (
    <Box ml={"2rem"}>
      <Box textAlign={"center"} fontSize={"1.5rem"}>
        SURVEY DETAIL
      </Box>
      <Box mt={"1rem"}>
        <Box>Name: {survey.name}</Box>
        <Box>Email: {survey.email}</Box>
        <Box>Gender: {survey.gender}</Box>
        <Box>Contact: {survey.contactNo}</Box>
        <Box>Address: {survey.address}</Box>
        <Box>Message: {survey.message}</Box>
        <Box>Nationality: {survey.nationality}</Box>
      </Box>
    </Box>
  );
};

export default SurveyDetails;
