import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Flex, Spinner } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  //  WAIT until auth is resolved
  if (loading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;