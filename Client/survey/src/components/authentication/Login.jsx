import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  VStack,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../environment";
const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleShowClick = () => {
    setShow(!show);
  };
  const submitSignInHandler = async () => {
    setLoading(true);
    if (!email || !password) {
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
        `${url}/signin`,
        { email, password },
        config
      );
      if (data.success) {
        toast({
          title: "Login successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data.token));
        setLoading(false);
        history("/survey");
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
      <FormControl id="login-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button
              h="1.75rem"
              p="0.25rem"
              bg="white"
              _hover="white"
              mr="1rem"
              size="sm"
              onClick={handleShowClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        mt="1.5rem"
        isLoading={loading}
        onClick={submitSignInHandler}
      >
        Log In
      </Button>
    </VStack>
  );
};

export default Login;
