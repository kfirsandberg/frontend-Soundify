

export function AppHeader() {
	return (
		<header className="app-header full">
			{/* Logo on the far left */}
			<img src="/assets/spotify_logo.svg" alt="Logo" className="logo" />

			{/* Center content: button and search input bar */}
			<div className="header-center-content">
				<button className="header-home-btn">
					<img src="/assets/home header.svg" alt="Home" className="home-icon" />
				</button>
				<div className="input-wrapper">
					<button className="header-search-btn">
						<img src="/assets/search2.svg" alt="Browse" className="search-icon" />
					</button>
					<input
						type="text"
						placeholder="Search..."
						className="header-search-input"
					/>
					<button className="header-browse-btn">
						<img src="/assets/browse.svg" alt="Browse" className="browse-icon" />
					</button>
				</div>
			</div>

			{/* Icon buttons on the right */}
			<div className="header-icon-btns">
				<button className="notification-btn">
					{/* Icon content, e.g., SVG or FontAwesome icon */}
					<img src="/assets/notifiction header.svg" alt="Browse" className="browse-icon" />
				</button>
				<button className="header-icon-btn">
					<img src="/assets/user.svg" alt="User Icon" className="header-icon" />
				</button>
			</div>
		</header>

	)
}
