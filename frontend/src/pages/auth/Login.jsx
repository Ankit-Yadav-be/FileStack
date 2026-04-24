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
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast({
        title: "All fields are required",
        status: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      await login(form);

      toast({
        title: "Login Successful 🎉",
        status: "success",
      });

      navigate("/");
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Login failed",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex h="100vh">
      
      {/* 🔥 LEFT SIDE (BRANDING / VISUAL) */}
      <Flex
        flex="1"
        bgGradient="linear(to-br, blue.500, purple.600)"
        color="white"
        align="center"
        justify="center"
        direction="column"
        display={{ base: "none", md: "flex" }}
        p={10}
      >
        <Heading size="xl" mb={4}>
          📁 Drive App
        </Heading>
        <Text fontSize="lg" opacity={0.9} textAlign="center">
          Store, organize and access your files anytime, anywhere.
        </Text>
      </Flex>

      {/* 🔥 RIGHT SIDE (FORM) */}
      <Flex flex="1" align="center" justify="center" bg="gray.50">
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="lg"
          w="350px"
        >
          <VStack spacing={5}>
            
            <Heading size="md">Welcome Back 👋</Heading>
            <Text fontSize="sm" color="gray.500">
              Login to continue
            </Text>

            {/* EMAIL */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiMail} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Email"
                name="email"
                onChange={handleChange}
                focusBorderColor="blue.500"
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
                focusBorderColor="blue.500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
              <InputRightElement>
                <Icon
                  as={show ? FiEyeOff : FiEye}
                  cursor="pointer"
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
            </InputGroup>

            {/* BUTTON */}
            <Button
              colorScheme="blue"
              w="full"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Logging in..."
            >
              Login
            </Button>

            {/* SIGNUP LINK */}
            <Text fontSize="sm" color="gray.600">
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#3182ce" }}>
                Signup
              </Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;