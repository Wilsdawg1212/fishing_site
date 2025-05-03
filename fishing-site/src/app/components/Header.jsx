'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Image from 'next/image';
import { styled, useTheme } from '@mui/material/styles';

const drawerWidth = 240;

// Custom DrawerHeader for spacing the top of the drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar,
}));

export default function Header() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => setOpen((prev) => !prev);

  return (
    <>
      {/* AppBar stays on top */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }} color="secondary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggleDrawer}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Image src="/fish-logo.png" alt="Logo" width={40} height={40} />
            <Typography
              variant="h6"
              noWrap
              sx={{ ml: 1, fontFamily: "'Lobster Two', cursive", color: 'inherit' }}
            >
              FishMan
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Persistent Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'sidebar.main',
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleToggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Log Catch', 'Gallery', 'About'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <Typography color="white">{text}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
