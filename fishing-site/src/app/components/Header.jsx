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
  Tooltip,
  Menu,
  MenuItem,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Image from 'next/image';
import { styled, useTheme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const navItems = [
    { text: 'Home', href: '/' },
    { text: 'Log Catch', href: '/log-catch' },
    { text: 'Gallery', href: '/gallery' },
    { text: 'About', href: '/about' },
    { text: 'My Logs', href: '/logbook'},
  ];

  const handleToggleDrawer = () => setOpen((prev) => !prev);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    handleClose();
  };

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
          <Box>
            <Tooltip title="Account">
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Persistent Drawer */}
      <Drawer
        variant="temporary"
        ModalProps={{ keepMounted: true }}
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
          {navItems.map(( {text, href }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} href={href}>
                <Typography color="white">{text}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
