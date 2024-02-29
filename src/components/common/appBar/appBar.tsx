import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE, SIGNIN } from "../../../constants";
import {
  selectIsAuthenticated,
  setAuthenticated,
} from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(SIGNIN);
  };
  const onLogOut = () => {
    dispatch(setAuthenticated(false));
    navigate(SIGNIN);
  };
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Button
            color="inherit"
            onClick={() => (isAuthenticated ? onLogOut() : handleClick())}
          >
            {isAuthenticated ? "LogOut" : "Login"}
          </Button>
          <Button color="inherit" onClick={() => navigate(HOME_PAGE)}>
            Video
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
