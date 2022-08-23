import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAdminReturnProps } from "../../hooks/admin";
import SideMenu from "../SideMenu";

const Header: React.FC<useAdminReturnProps> = ({ roots, onClickLogOut }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const hanleClick = (): void => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={hanleClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              iroha-app
            </Typography>
            <Button color="inherit" onClick={onClickLogOut}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <SideMenu toggleDrawer={toggleDrawer} setOpen={setOpen} roots={roots} />
      </Drawer>
    </>
  );
};

export default Header;
