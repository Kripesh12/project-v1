import { AppShell, Burger, Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
  useLoaderData,
} from "react-router-dom";
import {
  FaAddressBook,
  FaArrowLeft,
  FaArrowRight,
  FaLongArrowAltUp,
  FaCode,
} from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";
import {
  IoStatsChartSharp,
  IoLogOutOutline,
  IoInformationCircleSharp,
} from "react-icons/io5";

import { FaKey } from "react-icons/fa6";
import classes from "./Dashboard.module.css";
import { useContext } from "react";
import { UserContext } from "../App";
import NavbarDashboard from "../components/NavbarDashboard";

export default function Dashboard() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  const { token } = user;
  const navlinkList = [
    { text: "Prompt", path: "prompt", icon: <FaLongArrowAltUp /> },
    { text: "Feed Knowledge", path: "knowledge", icon: <FaAddressBook /> },
    { text: "Statistics", path: "stats", icon: <IoStatsChartSharp /> },
    { text: "User Leads", path: "leads", icon: <SiGoogleads /> },
    {
      text: "Chatbot Details",
      path: "details",
      icon: <IoInformationCircleSharp />,
    },
    { text: "Generate Script", path: "script", icon: <FaCode /> },
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
        <div id="nav">
          <Flex direction="column" gap={10}>
            {navlinkList.map((item, index) => {
              return (
                <NavLink
                  className={classes.navlink}
                  key={index}
                  to={item.path}
                  // active={location.pathname === item.path}
                >
                  {item.icon} {item.text}
                </NavLink>
              );
            })}
          </Flex>
        </div>
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
