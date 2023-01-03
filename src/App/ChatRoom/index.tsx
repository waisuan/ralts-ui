import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import Button from "@mui/material/Button";

import { useAppSelector, useAppDispatch } from "../hooks"
import { chatSliceActions, getMessages } from "./chatSlice"
import { Box, Container } from "@mui/system";
import { AppBar, IconButton, Menu, MenuItem, Paper, TextField, Toolbar, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

const ChatRoom: React.FC = () => {
    const messages = useAppSelector(getMessages)
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [inputMessage, setInputMessage] = useState<String>("");
    const messagesEndRef = useRef<null | HTMLDivElement>(null); 

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (msg: String) => {
        setInputMessage(msg);
    }

    const handleSend = () => {
        dispatch(chatSliceActions.sendMessage(inputMessage));
        setInputMessage("");
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        dispatch(chatSliceActions.initConnection());
    }, [dispatch]);

    useEffect(() => {
        scrollToBottom();
      }, [messages]);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ralts.
                    </Typography>
                    <IconButton
                        // sx={{ p: 0 }}
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        sx={{ mt: "40px" }}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                <Box sx={{
                    mt: 2,
                    width: "100%",
                    height: 800,
                    border: "1px solid black",
                    borderRadius: "10px",
                    // backgroundColor: "#F1F1F1",
                    maxHeight: 800,
                    overflow: "auto"
                }}>
                    {messages.map((m) => (
                        <div key={m.createdAt}>
                            <Box
                                sx={{
                                    p: "5px",
                                    m: "5px",
                                    border: "1px solid black",
                                    width: 250,
                                    backgroundColor: "#33F6FF",
                                    ...(m.userId === "EvanSia" && {
                                        backgroundColor: "white",
                                        ml: "auto"
                                    })
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ color: "gray" }}
                                >
                                    {m.userId} | {m.createdAt}
                                </Typography>
                                <Typography variant="body2" display="block">
                                    {m.text}
                                </Typography>
                            </Box>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                    {/* <div>
                        <Box
                            sx={{
                                p: "5px",
                                m: "5px",
                                border: "1px solid black",
                                width: 250,
                                backgroundColor: "#33F6FF"
                            }}
                        >
                            <Typography
                                variant="caption"
                                display="block"
                                sx={{ color: "gray" }}
                            >
                                Sia
                            </Typography>
                            <Typography variant="body2" display="block">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </Typography>
                        </Box>
                    </div>
                    <div>
                        <Box
                            sx={{
                                p: "5px",
                                m: "5px",
                                border: "1px solid black",
                                width: 250,
                                backgroundColor: "white",
                                ml: "auto"
                            }}
                        >
                            <Typography
                                variant="caption"
                                display="block"
                                sx={{ color: "gray" }}
                            >
                                Evan
                            </Typography>
                            <Typography variant="body2" display="block">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </Typography>
                        </Box>
                    </div> */}
                </Box>
                <Box sx={{ mt: 2, mb: 2 }}>
                    <TextField 
                        sx={{
                            width: "100%",
                        }}
                        inputProps={{
                            maxLength: 250,
                          }}
                        InputProps={{
                            endAdornment: (
                                <IconButton color="primary" onClick={handleSend}>
                                    <SendIcon />
                                </IconButton>
                            )
                        }}
                        placeholder="Say something..."
                        onChange={(e) => {handleChange(e.target.value)}}
                        onKeyUp={(e) => {if (e.key === "Enter") {handleSend()}}}
                        value={inputMessage || ""}
                    />
                </Box>
            </Container>
        </div>
    )
}

export default ChatRoom