import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  UnorderedList,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { HomeIcon } from "../icons/home";
import { HistoryIcon } from "../icons/history";
import { SettingIcon } from "../icons/setting";
import { PersonIcon } from "../icons/person";
import { MenuIcon } from "../icons/menu";
import { LogoutIcon } from "../icons/logout";
import { LoginIcon } from "../icons/login";

import Cart from "../cart/cart";
import useAuth from "../../store/auth";
import { logout as logoutRequest } from "../../api/auth";

export default function Header() {
  const toast = useToast();
  const { isAuth, user, logout } = useAuth();
  const handleLogout = async () => {
    if (!isAuth) return;
    try {
      console.log("domo");
      await logoutRequest();
      toast({
        title: "Logout succesfully",
        description: "asdasd",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Container
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      maxW="7xl"
      mx="auto"
      py="6"
      shadow="base"
      roundedBottomLeft="20"
      roundedBottomRight="20"
    >
      <Heading as="h1" fontSize="2xl" fontWeight="semibold">
        <Link as={RouterLink} to="/" _hover={{ textDecor: "none" }}>
          ShopApp
        </Link>
      </Heading>

      <Box display={{ base: "none", md: "block" }} as="nav">
        <Nav role={user?.role} />
      </Box>

      <Flex gap="6">
        {user?.role !== "ADMIN" && <Cart />}
        <Box display={{ base: "block", md: "none" }}>
          <SmallMenu logout={handleLogout} isAuth={isAuth} role={user?.role} />
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<PersonIcon />}
              variant="outline"
              rounded="full"
              w="10"
              h="10"
              borderColor="blackAlpha.500"
            />
            <MenuList>
              <Flex justifyContent="space-between">
                <MenuItem
                  icon={isAuth ? <PersonIcon /> : <LoginIcon />}
                  as={NavLink}
                  to={isAuth ? "/profile" : "/login"}
                  w="auto"
                  display="flex"
                >
                  {isAuth ? "Profile" : "Login"}
                </MenuItem>
                {isAuth && (
                  <MenuItem w="auto" rounded="full" onClick={handleLogout}>
                    <Tooltip label="Logout">
                      <VisuallyHidden>Logout</VisuallyHidden>
                      <Icon as={LogoutIcon} />
                    </Tooltip>
                  </MenuItem>
                )}
              </Flex>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Container>
  );
}

const Nav = ({ role }) => {
  return (
    <UnorderedList styleType="none" display="flex" flexDir="row" gap="8">
      <ListItem>
        <MenuLink icon={HomeIcon} text="" />
      </ListItem>
      <ListItem>
        <MenuLink
          icon={HistoryIcon}
          text={role === "ADMIN" ? "tables" : "history"}
        />
      </ListItem>
      <ListItem>
        <MenuLink icon={SettingIcon} text="settings" />
      </ListItem>
    </UnorderedList>
  );
};

const MenuLink = ({ icon, text }) => {
  return (
    <Link as={RouterLink} to={`/${text}`} _hover={{ textDecor: "none" }}>
      <Box
        display="flex"
        alignItems="center"
        gap="1"
        textTransform="capitalize"
      >
        <Icon as={icon} boxSize={6} />
        {text === "" ? "home" : text}
      </Box>
    </Link>
  );
};

const SmallMenu = ({ isAuth, role, logout }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MenuIcon />}
        variant="outline"
        rounded="full"
        w="10"
        h="10"
        borderColor="blackAlpha.500"
      />
      <MenuList>
        <MenuItem icon={<HomeIcon />} as={NavLink}>
          Home
        </MenuItem>

        <MenuItem
          icon={<HistoryIcon />}
          as={NavLink}
          to={role === "ADMIN" ? "/tables" : "/history"}
        >
          {role === "ADMIN" ? "Tables" : "History"}
        </MenuItem>

        <MenuItem icon={<SettingIcon />} as={NavLink} to="/settings">
          Settings
        </MenuItem>

        <Box h="0.5" w="full" bg="gray.100" my="4" />

        <Flex justifyContent="space-between">
          <MenuItem
            icon={isAuth ? <PersonIcon /> : <LoginIcon />}
            as={NavLink}
            to={isAuth ? "/profile" : "/login"}
            w="auto"
          >
            {isAuth ? "Profile" : "Login"}
          </MenuItem>
          {isAuth && (
            <MenuItem w="auto" rounded="full" onClick={logout}>
              <Tooltip label="Logout">
                <VisuallyHidden>Logout</VisuallyHidden>
                <Icon as={LogoutIcon} />
              </Tooltip>
            </MenuItem>
          )}
        </Flex>
      </MenuList>
    </Menu>
  );
};
