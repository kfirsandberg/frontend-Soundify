import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ColorThief from 'colorthief';
import { useState, useEffect } from 'react';


export function LastStations({ stations }) {
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const displayedStations = stations.slice(0, 8);
    const [dominantColors, setDominantColors] = useState([]);

    // useEffect(() => {
    //     const fetchDominantColors = async () => {
    //         const colors = await Promise.all(
    //             displayedStations.map(station =>
    //                 ColorThief.getColor(station.imgURL)
    //                     .then(color => {
    //                         console.log('Dominant color for', station.name, color); // Print the color for each station
    //                         return color;
    //                     })
    //                     .catch(err => {
    //                         console.error('Error getting dominant color:', err);
    //                         return null; // Handle error gracefully
    //                     })
    //             )
    //         );
    //         setDominantColors(colors);
    //     };

    //     fetchDominantColors();
    // }, [displayedStations]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ThemeProvider theme={darkTheme}>
                    <Box
                        className="last-stations-grid"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                            p: 2,
                        }}
                    >
                        {displayedStations.map((station, index) => (
                            <div className="playlist-card" key={index}>
                                <img
                                    src={station.imgURL}
                                    alt={station.name}
                                    className="playlist-thumbnail"
                                />
                                <div className="playlist-info">
                                    <div className="playlist-name">{station.name}</div>
                                </div>
                                <div className="playlist-play-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        data-encore-id="icon"
                                        role="img"
                                        aria-hidden="true"
                                        className="Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq"
                                        viewBox="0 0 24 24">
                                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" /></svg>
                                </div>
                            </div>
                        ))}
                    </Box>
                </ThemeProvider>
            </Grid>
        </Grid>
    );
}
