import {
  Flex,
  Text,
  Button,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { FiLogOut, FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useAuth(); // assume user exists
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex
      px={6}
      py={3}
      bg="white"
      justify="space-between"
      align="center"
      borderBottom="1px solid #e2e8f0"
      position="sticky"
      top="0"
      zIndex="100"
      boxShadow="sm"
    >
      {/*  LEFT: BRAND */}
      <HStack spacing={2}>
        <Text fontSize="lg">📁</Text>
        <Text
          fontSize="lg"
          fontWeight="bold"
          bgGradient="linear(to-r, blue.500, purple.500)"
          bgClip="text"
        >
          Drive App
        </Text>
      </HStack>

      {/*  RIGHT: USER MENU */}
      <HStack spacing={4}>
        <Menu>
          <MenuButton>
            <HStack
              spacing={2}
              px={3}
              py={1.5}
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
            >
              <Avatar
                size="sm"
                name={user?.name || "User"}
              />
              <Text fontSize="sm" fontWeight="medium">
                {user?.name || "User"}
              </Text>
            </HStack>
          </MenuButton>

          <MenuList>
            <MenuItem icon={<Icon as={FiUser} />}>
              Profile
            </MenuItem>

            <MenuItem
              icon={<Icon as={FiLogOut} />}
              onClick={handleLogout}
              color="red.500"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>

      </HStack>
    </Flex>
  );
};

export default Navbar;