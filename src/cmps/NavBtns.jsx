import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export function NavBtns() {
    return (
        <Box className="navBtn">
            <Fab className="nav-btn-active">All</Fab>
            <Fab className="nav-btn">Music</Fab>
            <Fab className="nav-btn">Podcasts</Fab>
        </Box>
    );
}
