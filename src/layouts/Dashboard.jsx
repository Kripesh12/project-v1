import { AppShell, Burger, Button, Flex, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaAddressBook,
  FaArrowLeft,
  FaArrowRight,
  FaLongArrowAltUp,
} from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import classes from "./Dashboard.module.css";
import { useContext } from "react";
import { UserContext } from "../App";
import NavbarDashboard from "../components/NavbarDashboard";
export default function Dashboard() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { token } = user;
  const navlinkList = [
    { text: "Prompt", path: "prompt", icon: <FaLongArrowAltUp /> },
    { text: "Feed Knowledge", path: "knowledge", icon: <FaAddressBook /> },
    { text: "Statistics", path: "stats", icon: <IoStatsChartSharp /> },
    { text: "Pricing", path: "pricing", icon: <MdAttachMoney /> },
    { text: "Logout", path: "logout", icon: <IoLogOutOutline /> },
  ];
  // if (token.length == 0) {
  //   window.location.href = "/login";
  // }
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="sm"
    >
      {/* Header */}
      <AppShell.Header>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
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
        <Button onClick={toggleDesktop} visibleFrom="sm" mb={20}>
          {desktopOpened ? <FaArrowLeft /> : <FaArrowRight />}
        </Button>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
