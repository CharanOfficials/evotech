import React from "react";
import SubmitSurvey from "../components/survey/SubmitSurvey";
import { Box } from "@chakra-ui/react";
import SurveyContainer from "../components/survey/ServeyContainer";
const Survey = () => {
  return (
    <>
      <Box w={"40%"} p={"0.6rem"} mt={"2%"}>
        <SubmitSurvey />
      </Box>
      <Box w={"40%"} ml={"2%"}>
        <SurveyContainer />
      </Box>
    </>
  );
};

export default Survey;
