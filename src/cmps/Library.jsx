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
        <div className={`library-route ${isLibraryCollapsed ? 'collapsed' : ''}`}>
            <section className="action-btns">
                <button className="toggle-lib-btn" onClick={toggleLibrary}>
                    <img src="/assets/library.svg" alt="Library" className="library-icon" />
                    <h3>{isLibraryCollapsed ? "" : "Your Library"}</h3>
                </button>
                {!isLibraryCollapsed && (
                    <>
                         <button className="create-playlist">
                            <img src="/assets/add playlist.svg" alt="Create Playlist" className="create-playlist-icon" />
                        </button>
                        <button className="show-more">
                            <img src="/assets/right_arrow.svg" alt="Right Arrow" className="right-arrow-icon" />
                        </button>
                    </>
                )}
            </section>

            {isLibraryCollapsed ? (
                <div className="collapsed-library">
                    <LibraryList filterCriteria={filterCriteria} sortBy={sortBy} isCollapsed={true} />
                </div>
            ) : (
                <>
                    <FilterLibrary setFilterCriteria={setFilterCriteria} setSortBy={setSortBy} />
                    <LibraryList filterCriteria={filterCriteria} sortBy={sortBy} isCollapsed={false} />
                </>
            )}
        </div>
    );
}
