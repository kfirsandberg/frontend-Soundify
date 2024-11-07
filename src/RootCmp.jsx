import React from 'react'
import { Routes, Route } from 'react-router'

import { StationIndex } from './pages/StationIndex.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppPlayer } from './cmps/AppPlayer.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import {Library} from "./cmps/Library.jsx"
export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />
            <main>
                <Routes>
                    <Route path="" element={<StationIndex />} />
                    <Route path="playlist/:playlistId" element={<StationDetails />} />
                </Routes>
            </main>
            <Library/>
            <AppPlayer />
        </div>
    )
}


