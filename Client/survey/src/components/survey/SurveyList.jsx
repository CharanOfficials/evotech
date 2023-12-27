import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../environment";
import {
  List,
  ListItem,
  ListIcon,
  Box,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { surveyState } from "../../context/survey.provider";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const { fetchAgain, setSelectedSurvey, selectedSurvey } = surveyState();
  useEffect(() => {
    const url = BACKEND_URL;
    const fetchSurveys = async () => {
      const { data } = await axios.get(`${url}/surveys`);
      setSurveys(data.data);
    };
    fetchSurveys();
  }, [fetchAgain]);
  const handleClick = (id) => {
    setSelectedSurvey(id);
  };
  return (
    <>
      <Box mt={"2rem"} textAlign={"center"} fontSize={"2rem"} ml={"2rem"}>
        SURVEY LIST
      </Box>
      <OrderedList
        cursor={"pointer"}
        overflow={"scroll"}
        maxHeight={"12rem"}
        ml={"2rem"}
      >
        {surveys.map((survey) => (
          <Box key={survey._id} onClick={() => handleClick(survey._id)}>
            <ListItem
              borderBottom={"1px"}
              padding={"0.5rem"}
              style={{
                background: selectedSurvey === survey._id ? "#F1DEDE" : "white",
              }}
            >
              <Box fontSize={"1.1rem"}>Name: {survey.name}</Box>
              <Box fontSize={"0.7rem"}>Contact No.: {survey.contactNo}</Box>
            </ListItem>
          </Box>
        ))}
      </OrderedList>
    </>
  );
};

export default SurveyList;
