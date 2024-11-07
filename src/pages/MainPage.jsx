import {AppHeader} from '../cmps/AppHeader'
import {StationList}   from "../cmps/StationList"
import {AppPlater} from "../cmps/AppPlayer"
export function MainPage() {
    return (
        <main className="main-page">
            <header>
                <AppHeader/>
            </header>
            <StationList />
            <AppPlater/>
        </main>
    )
}