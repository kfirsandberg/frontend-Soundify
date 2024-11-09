

export function AppHeader() {
	return (
		<header className="app-header full">
			{/* Logo on the far left */}
			<img src="path/to/logo.png" alt="Logo" className="logo" />

			{/* Center content: button and search input bar */}
			<div className="header-center-content">
				<button className="header-home-btn">Button</button>
				<input 
					type="text" 
					placeholder="Search..." 
					className="header-search-input"
				/>
			</div>

			{/* Icon buttons on the right */}
			<div className="header-icon-btns">
				<button className="header-icon-btn">
					{/* Icon content, e.g., SVG or FontAwesome icon */}
					<i className="header-icon">🔔</i> {/* Example icon */}
				</button>
				<button className="header-icon-btn">
					<i className="header-icon">⚙️</i> {/* Example icon */}
				</button>
			</div>
		</header>

	)
}
