import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { AdminRootsProps } from "../../hooks/admin";

interface Props {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  setOpen: (value: boolean) => void;
  roots: AdminRootsProps[];
}

const SideMenu: React.FC<Props> = ({ toggleDrawer, setOpen, roots }) => {
  const handleBack = (): void => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {roots.map((r, ind) => (
          <ListItem key={ind} disablePadding>
            <ListItemButton onClick={r.root}>
              <ListItemText primary={r.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleBack}>
            <ListItemText primary="Close" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideMenu;
