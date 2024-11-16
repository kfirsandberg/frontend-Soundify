import { useEffect, useState } from 'react'
import { CategoryList } from '../cmps/CategoryList.jsx'
import loaderIcon from '/assets/loader.svg'
import musicImg from '/assets/img/music.jpeg'
import podcastsImg from '/assets/img/podcasts.jpeg'
import liveEventsImg from '/assets/img/liveEvents.jpeg'
import madeForYouImg from '/assets/img/madeForYou.jpg'
import newReleasesImg from '../../public/assets/img/newReleases.jpeg'
import popImg from '../../public/assets/img/pop.jpeg'
import hipHopImg from '../../public/assets/img/hipHop.jpeg'
import rockImg from '../../public/assets/img/rock.jpeg'
import latinImg from '../../public/assets/img/latin.jpeg'
import podcastChartsImg from '../../public/assets/img/podcastCharts.jpeg'
import educationalImg from '../../public/assets/img/educational.jpeg'
import documentaryImg from '../../public/assets/img/documentary.jpeg'
import comedyImg from '../../public/assets/img/comedy.jpeg'
import moodImg from '../../public/assets/img/mood.jpeg'
import workoutImg from '../../public/assets/img/workout.jpeg'

export function BrowseIndex() {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        // Simulate loading categories (this would usually be an API call)
        const mockCategories = createCategories()
        setCategories(mockCategories)
    }, [])

    function createCategories() {
        return [
            { id: '1', name: 'Music', imgURL: musicImg, bgColor: '#dc148c' },
            { id: '2', name: 'Podcasts', imgURL: podcastsImg, bgColor: '#006450' },
            { id: '3', name: 'Live Events', imgURL: liveEventsImg, bgColor: '#8400e7' },
            { id: '4', name: 'Made For You', imgURL: madeForYouImg, bgColor: '#1e3264' },
            { id: '5', name: 'New Releases', imgURL: newReleasesImg, bgColor: '#608108' },
            { id: '6', name: 'Pop', imgURL: popImg, bgColor: '#477d95' },
            { id: '7', name: 'Hip-Hop', imgURL: hipHopImg, bgColor: '#477d95' },
            { id: '8', name: 'Rock', imgURL: rockImg, bgColor: '#006450' },
            { id: '9', name: 'Latin', imgURL: latinImg, bgColor: '#e1118c' },
            { id: '10', name: 'Podcast Charts', imgURL: podcastChartsImg, bgColor: '#0d73ec' },
            { id: '11', name: 'Educational', imgURL: educationalImg, bgColor: '#477d95' },
            { id: '12', name: 'Documentary', imgURL: documentaryImg, bgColor: '#503750' },
            { id: '13', name: 'Comedy', imgURL: comedyImg, bgColor: '#af2896' },
            { id: '14', name: 'Mood', imgURL: moodImg, bgColor: '#e1118c' },
            { id: '15', name: 'Workout', imgURL: workoutImg, bgColor: '#777777' },
        ]
    }

    if (!categories) {
        return (
            <div>
                <img src={loaderIcon} alt="Loading..." className="loader-icon" />
            </div>
        )
    }

    return (
        <section className="browse-index">
            <h1>Browse all</h1>
            <CategoryList categories={categories} />
        </section>
    )
}
