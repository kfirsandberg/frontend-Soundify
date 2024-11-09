import {LibraryList} from "../cmps/LibraryList"
import { FilterLibrary } from "../cmps/FilterLibrary"
export function Library() {
	return (
		<header className="library">
			
			<FilterLibrary />
			<LibraryList/>
		</header>
	)
}
