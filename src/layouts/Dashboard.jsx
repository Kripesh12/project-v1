import {
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Flex,
  Loader,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaAddressBook,
  FaArrowLeft,
  FaArrowRight,
  FaLongArrowAltUp,
  FaCode,
  FaSearch,
} from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";
import {
  IoStatsChartSharp,
  IoLogOutOutline,
  IoInformationCircleSharp,
} from "react-icons/io5";
import classes from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import NavbarDashboard from "../components/NavbarDashboard";
import api from "../api";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [isUserAuthenticaated, setIsUserAuthenticated] = useState();
  const user = useContext(UserContext);
  const { token } = user;

  const navlinkList = [
    { text: "Prompt", path: "prompt", icon: <FaLongArrowAltUp /> },
    { text: "Feed Knowledge", path: "knowledge", icon: <FaAddressBook /> },
    { text: "Statistics", path: "stats", icon: <IoStatsChartSharp /> },
    { text: "User Leads", path: "leads", icon: <SiGoogleads /> },
    { text: "User Prompts", path: "user-prompt", icon: <FaSearch /> },
    {
      text: "Chatbot Details",
      path: "details",
      icon: <IoInformationCircleSharp />,
    },
    { text: "Generate Script", path: "script", icon: <FaCode /> },
    { text: "Logout", path: "logout", icon: <IoLogOutOutline /> },
  ];

  if (token.length == 0) {
    window.location.href = "/login";
  }

  async function getTokenVerified() {
    const res = await api.post(
      "/auth/get-info",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status === 201
      ? setIsUserAuthenticated(true)
      : setIsUserAuthenticated(false);
    return res.status;
  }

  const { isPending, isError, error } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: getTokenVerified,
  });

  if (isPending) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" variant="bars" />
      </Center>
    );
  }

  if (isError) {
    <span>Error: {error.message}</span>;
  }

  if (isUserAuthenticaated) {
    return (
      <Box>
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
      </Box>
    );
  } else {
    return (
      <Center mt={100}>
        <Stack align="center" gap={10}>
          <Title fz={28} c={"#3a3a3a"}>
            Your session has expired. Please login again
          </Title>
          <Link to="/login" className="link">
            Go back to login
          </Link>
        </Stack>
      </Center>
    );
  }
}
