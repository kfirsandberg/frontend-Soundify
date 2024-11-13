import { useState } from 'react';

export function NavBtns() {
    // State to keep track of the active button
    const [activeButton, setActiveButton] = useState("All");

    // Handle button click
    function handleClick(ev) {
        const clickedButton = ev.target.textContent;
        setActiveButton(clickedButton); // Update the active button state
    }

    return (
        <div className="nav-btns">
            <button
                onClick={handleClick}
                className={`nav-btn${activeButton === "All" ? "-active" : ""}`}
            >
                All
            </button>
            <button
                onClick={handleClick}
                className={`nav-btn${activeButton === "Music" ? "-active" : ""}`}
            >
                Music
            </button>
            <button
                onClick={handleClick}
                className={`nav-btn${activeButton === "Podcasts" ? "-active" : ""}`}
            >
                Podcasts
            </button>
        </div>
    );
}
