import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

type Props = {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  setOpen: (value: boolean) => void;
};

const SideMenu: React.FC<Props> = ({
  toggleDrawer,
  setOpen
}) => {
  const router = useRouter();

  const handleBack = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/')}>
            <ListItemText primary="HOME" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  )
};

export default SideMenu;