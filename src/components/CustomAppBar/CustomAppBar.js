import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SessionManager from "../Auth/SessionManager";
import { useNavigate } from 'react-router-dom';

import Logo from "./Group 98 (1).svg"

const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

const pages = ["Products", "Pricing", "Blog"];

function CustomAppBar(){
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    let navigate = useNavigate();

    const goToMenu = () => {
        if(SessionManager.getRole() === "Vet"){
            navigate("/vetMenu");
        }
        else if(SessionManager.getRole() === "Admin") {
            navigate("/adminMenu");
        }
        else{
            navigate("/ownerMenu");
        }
    }

    const goToProfile = () => {
      if(SessionManager.getRole() === "Vet"){
        navigate("/vetMenu/profile");
      }
    }

    const logout = () => {
        navigate("/logout")
    }
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return(
        <ThemeProvider theme={theme}>
                    <Typography component={'span'} variant={'body2'}>
                    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={Logo} alt="logo" onClick={goToMenu} style={{cursor: "pointer"}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              opacity: 0
            }}
          >
            LOGO
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", opacity: 0 }
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                opacity: 0
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              opacity: 0 
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, opacity: 0  }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block", cursor: "context-menu" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ transform: "scale(1.3)"}} alt="Remy Sharp" src={SessionManager.getProfilePicture()} />
              </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              disableScrollLock="true"
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            <MenuItem onClick={goToProfile}>
                <Typography textAlign="center">Profil</Typography>
            </MenuItem>
            <MenuItem onClick={logout}>
                <Typography textAlign="center">Wyloguj</Typography>
            </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
        </Typography>
        </ThemeProvider>
    );
}

export default CustomAppBar;