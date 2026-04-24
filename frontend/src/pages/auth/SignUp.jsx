import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast({
        title: "All fields are required",
        status: "warning",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
      });
      return;
    }

    try {
      setLoading(true);

      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast({
        title: "Account created successfully 🎉",
        status: "success",
      });

      navigate("/");
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Signup failed",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex h="100vh">

      {/*  LEFT SIDE (BRANDING) */}
      <Flex
        flex="1"
        bgGradient="linear(to-br, green.500, teal.500)"
        color="white"
        align="center"
        justify="center"
        direction="column"
        display={{ base: "none", md: "flex" }}
        p={10}
      >
        <Heading size="xl" mb={4}>
           Join Drive App
        </Heading>
        <Text fontSize="lg" opacity={0.9} textAlign="center">
          Create your account and manage your files like a pro.
        </Text>
      </Flex>

      {/*  RIGHT SIDE (FORM) */}
      <Flex flex="1" align="center" justify="center" bg="gray.50">
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="lg"
          w="350px"
        >
          <VStack spacing={5}>

            <Heading size="md">Create Account </Heading>
            <Text fontSize="sm" color="gray.500">
              Signup to get started
            </Text>

            {/* NAME */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiUser} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Full Name"
                name="name"
                onChange={handleChange}
                focusBorderColor="green.500"
              />
            </InputGroup>

            {/* EMAIL */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiMail} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Email"
                name="email"
                onChange={handleChange}
                focusBorderColor="green.500"
              />
            </InputGroup>

            {/* PASSWORD */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                focusBorderColor="green.500"
              />
              <InputRightElement>
                <Icon
                  as={show ? FiEyeOff : FiEye}
                  cursor="pointer"
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
            </InputGroup>

            {/* CONFIRM PASSWORD */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                focusBorderColor="green.500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
            </InputGroup>

            {/* BUTTON */}
            <Button
              colorScheme="green"
              w="full"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Creating..."
            >
              Create Account
            </Button>

            {/* LOGIN LINK */}
            <Text fontSize="sm" color="gray.600">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#38a169" }}>
                Login
              </Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;