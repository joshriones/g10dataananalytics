import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import HistoryIcon from "@mui/icons-material/History";

import logo from "../src/img/analysis.png";
import barproj from "../src/img/bar_proj.png";
import boxhrs from "../src/img/box_mnth.png";
import heatmap from "../src/img/heatmap.png";
import logplot from "../src/img/prediction_log.png";
import stacked from "../src/img/stacked_bar.png";
import treeMatrix from "../src/img/tree_matrix.png";
import treeBar from "../src/img/tree_bar.png";
import treeForest from "../src/img/tree_forest.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
};

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal((openModal) => setOpenModal(false));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (elementId) => {
    scrollToElement(elementId);
  };

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: "#5837AB",
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "#5837AB" }} />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#5837AB",
              letterSpacing: "2px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>
              <img src={logo} alt="logo" className="h-6 w-6" />
            </span>{" "}
            VISUAL VISTA
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="flex">
          <h2 className="font-bold text-slate-500 flex-1 ml-3">Dashboard</h2>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              backgroundColor: "#ECE7F5",
              color: "#5837AB",
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Descriptive graph", "Logistic graph", "Decision tree graph"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block", marginTop: "13px" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                      backgroundColor: "#ECE7F5",
                      color: "#5837AB",
                    },
                  }}
                  onClick={() => handleClick(`graph${index + 1}`)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#5837AB",
                    }}
                  >
                    {index === 0 && <PieChartIcon />}
                    {index === 1 && <BarChartIcon />}
                    {index === 2 && <LineAxisIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      color: "#5837AB",
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <section id="graph1" className="p-8 bg-[#EFF2F6] rounded-lg">
          <h1 className="font-semibold text-xl mb-4 text-slate-700">
            Predicting Employee Left
          </h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="px-5 py-6 rounded-lg bg-[#5837AB]">
              <div className="p-2 bg-[#41289A] w-[42px] rounded-lg mb-3">
                <ThumbDownOffAltIcon
                  sx={{
                    color: "white",
                    padding: "2px",
                  }}
                />
              </div>
              <h3 className="text-4xl font-bold text-white mb-1">1991</h3>
              <h5 className="text-lg text-purple-200">Left</h5>
            </div>
            <div className="px-5 py-6 rounded-lg bg-[#4286DE] ">
              <div className="p-2 bg-[#3063BA] w-[42px] rounded-lg mb-3">
                <GroupIcon
                  sx={{
                    color: "white",
                    padding: "2px",
                  }}
                />
              </div>
              <h3 className="text-4xl font-bold text-white mb-1">10000</h3>
              <h5 className="text-lg text-blue-200">Stayed</h5>
            </div>
            <div className="px-5 py-6 rounded-lg bg-[#E15241] ">
              <div className="p-2 bg-[#ED978D] w-[42px] rounded-lg mb-3">
                <AccessTimeIcon
                  sx={{
                    color: "white",
                    padding: "2px",
                  }}
                />
              </div>
              <h3 className="text-4xl font-bold text-white mb-1">200.47</h3>
              <h5 className="text-lg text-red-200">Avg. Monthly Hours</h5>
            </div>

            <div className="flex flex-col gap-3">
              <div className="px-4 py-5 rounded-lg bg-[#4286DE] flex gap-3">
                <div className="flex items-center px-2 bg-[#3063BA] rounded-lg">
                  <HourglassBottomIcon
                    sx={{
                      color: "white",
                      padding: "2px",
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">3.36</h3>
                  <h5 className="text-sm text-blue-200">Tenure</h5>
                </div>
              </div>
              <div className="px-4 py-5 rounded-lg bg-white flex gap-3">
                <div className="flex items-center px-2 bg-[#FEF8E3] rounded-lg">
                  <HistoryIcon
                    sx={{
                      color: "#F6C344",
                      padding: "2px",
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">3.80</h3>
                  <h5 className="text-sm text-slate-400">
                    Avg. Number of Projectes
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="col-span-2 bg-white rounded-lg p-3 text-center">
              <h1 className="font-bold">Number of projects histogram</h1>
              <img src={barproj} alt="bar" className="w-full h-auto" />
            </div>
            <div
              className="col-span-1 bg-white rounded-lg"
              onClick={handleClickOpenModal}
            >
              <img
                src={heatmap}
                alt="heatmap"
                className="w-full h-full rounded-lg"
              />
              {openModal && (
                <div
                  className="absolute w-[900px] h-[600px] left-[320px] top-[180px] border-4 border-red-500 rounded-[18px]"
                  onClick={handleCloseModal}
                >
                  <img
                    src={heatmap}
                    alt="heatmap"
                    className="w-full h-full rounded-[18px]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 w-full bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold ml-4">
              Monthly hours by number of projects
            </h1>
            <img
              src={boxhrs}
              alt="box"
              className="w-full h-[500px] rounded-lg"
            />
          </div>
        </section>
        <section
          id="graph2"
          className="flex gap-6 mt-6 p-8 bg-[#EFF2F6] rounded-lg"
        >
          <div className="flex-1 h-full bg-white p-5 rounded-xl">
            <h1 className="text-2xl mb-2 font-bold">
              Counts of employees who left versus stayed across department
            </h1>
            <img
              src={stacked}
              alt="stacked"
              className="w-full h-[470px] rounded-xl"
            />
          </div>
          <div className="flex-1 h-full rounded-xl bg-white p-5 ">
            <h1 className="text-2xl mb-2 font-bold">Confusion Matrix</h1>
            <img
              src={logplot}
              alt="logistic plot"
              className="w-full h-[500px] rounded-xl"
            />
          </div>
        </section>
        <section
          id="graph3"
          className="grid grid-cols-2 gap-6 mt-6 p-8 bg-[#EFF2F6] rounded-lg"
        >
          <div className="rounded-xl bg-white text-center p-2 w-full h-[320px]">
            <h1 className="font-bold">Decision tree: Confusion matrix</h1>
            <img
              src={treeMatrix}
              alt="tree matrix"
              className="rounded-lg w-full h-[280px]"
            />
          </div>
          <div className="h-[320px]">
            <img
              src={treeBar}
              alt="tree bar"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="h-full col-span-1">
            <img
              src={treeForest}
              alt="tree forest"
              className="rounded-lg h-[320px] w-full"
            />
          </div>
        </section>
      </Box>
    </Box>
  );
}
