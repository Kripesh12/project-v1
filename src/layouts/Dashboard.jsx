import { AppShell, Box, Burger, Flex, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaLongArrowAltUp } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import classes from "./Dashboard.module.css";
import { useContext } from "react";
import { UserContext } from "../App";
import NavbarDashboard from "../components/NavbarDashboard";
export default function Dashboard() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { token } = user;
  const navlinkList = [
    { text: "Prompt", path: "prompt", icon: <FaLongArrowAltUp /> },
    { text: "Logout", path: "logout", icon: <IoLogOutOutline /> },
  ];
  console.log(token.length);
  if (token.length == 0) {
    window.location.href = "/login";
  }
  if (token.length > 0)
    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        {/* Header */}
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <NavbarDashboard />
        </AppShell.Header>

        {/* Navbar */}
        <AppShell.Navbar p="xs" bg={"blue"}>
          <Flex direction="column" gap={10}>
            {navlinkList.map((item, index) => {
              return (
                <NavLink className={classes.navlink} key={index} to={item.path}>
                  {item.icon} {item.text}
                </NavLink>
              );
            })}
          </Flex>
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    );
}
