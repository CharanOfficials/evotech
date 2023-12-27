import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../environment.js";
import { surveyState } from "../../context/survey.provider.jsx";
const SubmitSurvey = () => {
  const { fetchAgain, setFetchAgain } = surveyState();
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [nationality, setNationality] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleShowClick = () => {
    setShow(!show);
  };
  const submitSurveyHandler = async () => {
    setLoading(true);
    if (
      !name ||
      !email ||
      !gender ||
      !contact ||
      !address ||
      !message ||
      !nationality
    ) {
      toast({
        title: "Please fill all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const url = BACKEND_URL;
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${url}/survey`,
        { name, email, gender, contact, address, message, nationality },
        config
      );
      if (data.success) {
        toast({
          title: "Form submitted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data.token));
        setLoading(false);
        setFetchAgain(!fetchAgain);
      }
    } catch (err) {
      toast({
        title: "Error Occured.",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="login-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-gender" isRequired>
        <FormLabel>Gender</FormLabel>
        <Input
          placeholder="Enter Your Gender male/female"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-contact" isRequired>
        <FormLabel>Contact</FormLabel>
        <Input
          type="Number"
          placeholder="Enter Your Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-address" isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          placeholder="Enter Your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-message" isRequired>
        <FormLabel>Message</FormLabel>
        <Input
          placeholder="Enter Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-nationality" isRequired>
        <FormLabel>Nationality</FormLabel>
        <Input
          placeholder="Enter Your Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        mt="1.5rem"
        isLoading={loading}
        onClick={submitSurveyHandler}
      >
        Submit Survey
      </Button>
    </VStack>
  );
};

export default SubmitSurvey;
