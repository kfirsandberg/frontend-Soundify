import { useState } from "react";
import { LibraryList } from "../cmps/LibraryList";
import { FilterLibrary } from "../cmps/FilterLibrary";

export function Library() {
	const [filterCriteria, setFilterCriteria] = useState("");
	const [sortBy, setSortBy] = useState("");
	const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false); // State to control collapsing of the library

	const toggleLibrary = () => {
		setIsLibraryCollapsed(prevState => !prevState); // Toggle the collapsed state
	};

	return (
		<div className="library">
			<section className="action-btns">
				<button className="toggle-lib-btn" onClick={toggleLibrary}>
					<h3>{isLibraryCollapsed ? "Expand Library" : "Your Library"}</h3>
				</button>
				{!isLibraryCollapsed && (
					<>
						<button className="create-playlist">+</button>
						<button className="show-more">⟶</button>
					</>
				)}
			</section>

			{isLibraryCollapsed ? (
				<div className="collapsed-library">
					<LibraryList filterCriteria={filterCriteria} sortBy={sortBy} isCollapsed={true} />
				</div>
			) : (
				<>
					<FilterLibrary
						setFilterCriteria={setFilterCriteria}
						setSortBy={setSortBy}
					/>
					<LibraryList filterCriteria={filterCriteria} sortBy={sortBy} isCollapsed={false} />
				</>
			)}
		</div>
	);
}
