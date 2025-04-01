// components/Navbar.tsx
'use client'
import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import InsertChartIcon from '@mui/icons-material/InsertChart';
// import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import themes from '../app/themes'; // Path to your theme file
// import { Button, Typography } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import memora_logo from '../src/assets/memora_logo.png';
import Image from 'next/image'


const Navbar2: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                  <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                  <CollectionsBookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Library" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                  <InsertChartIcon />
              </ListItemIcon>
              <ListItemText primary="Stats" />
            </ListItemButton>
          </ListItem>
        </List>
    </Box>
  );
  return (
    <ThemeProvider theme={themes}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <img src="/memora_logo.png" alt="Logo" style={{ width: '30px', height: 'auto' }} />
          <Typography variant="h6" sx={{ flexGrow: 1 , color: 'black' , marginLeft: 1}}>
            Memora
          </Typography>
          <Box>
            {/* <Link href="/" passHref>
              <Button color="inherit" sx={{ color: 'black'}}>Home</Button>
            </Link> */}
            <Link href="/" passHref>
              <SearchIcon sx={{ color: 'black', marginRight: 1 }} />
            </Link>
            <Link href="/" passHref>
              <MenuIcon sx={{ color: 'black', marginRight: 1 }} onClick={toggleDrawer(true)}/>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
              </Drawer>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar2;
