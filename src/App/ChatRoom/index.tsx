import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';

import { useAppSelector, useAppDispatch } from '../hooks'
import { chatSliceActions, getMessages } from './chatSlice'
import { Box, Container } from '@mui/system';
import { AppBar, IconButton, Menu, MenuItem, Paper, TextField, Toolbar, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const ChatRoom: React.FC = () => {
    const messages = useAppSelector(getMessages)
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      };

    // useEffect(() => {
    //     dispatch(chatSliceActions.initConnection());
    // }, [dispatch]);

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
                        sx={{ mt: '40px' }}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
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
                    width: '100%',
                    height: 800,
                    border: '1px solid black',
                    borderRadius: '10px',
                    // backgroundColor: '#F1F1F1',
                    maxHeight: 800,
                    overflow: 'auto'
                }}>
                    <div>
                        <Box
                            sx={{
                                p: '5px',
                                m: '5px',
                                border: '1px solid black',
                                width: 250,
                                backgroundColor: '#33F6FF'
                            }}
                        >
                            <Typography
                                variant="caption"
                                display="block"
                                sx={{ color: 'gray' }}
                            >
                                Sia
                            </Typography>
                            <Typography variant="body2" display="block">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </Typography>
                        </Box>
                    </div>
                    <div>
                        <Box
                            sx={{
                                p: '5px',
                                m: '5px',
                                border: '1px solid black',
                                width: 250,
                                backgroundColor: 'white',
                                ml: 'auto'
                            }}
                        >
                            <Typography
                                variant="caption"
                                display="block"
                                sx={{ color: 'gray' }}
                            >
                                Evan
                            </Typography>
                            <Typography variant="body2" display="block">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </Typography>
                        </Box>
                    </div>
                    <div>
                        <Box
                            sx={{
                                p: '5px',
                                m: '5px',
                                border: '1px solid black',
                                width: 250,
                                backgroundColor: 'white',
                                ml: 'auto'
                            }}
                        >
                            <Typography
                                variant="caption"
                                display="block"
                                sx={{ color: 'gray' }}
                            >
                                Evan
                            </Typography>
                            <Typography variant="body2" display="block">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </Typography>
                        </Box>
                    </div>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField 
                        sx={{
                            width: '100%',
                        }}
                        inputProps={{
                            maxLength: 250,
                          }}
                        InputProps={{
                            endAdornment: (
                                <IconButton color="primary">
                                    <SendIcon />
                                </IconButton>
                            )
                        }}
                        placeholder="Say something..."
                    />
                </Box>
                {/* <div>
                    {messages.map((m) => <p key={m}>{m}</p>)}
                </div> */}
            </Container>
        </div>
    )
}

export default ChatRoom