import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage, makeId } from '../util.service'

const STORAGE_KEY = 'station'
const BASE_URL = 'http://127.0.0.1:3030/api/ytmusic/search'

export const stationLocalService = {
    query,
    getById,
    getSongById,
    saveStation,
    removeStation,
    addStation,
    getEmptyStation,
    removeSong,
    addSong,
    addSongToLikedSongs,
    removeSongFromLikedSongs,
    ensureSong,
    calculateTotalDuration
}
const gImg = 'https://res.cloudinary.com/dwzeothxl/image/upload/v1731394907/Screenshot_2024-11-12_085302_pmlaey.png'
_createStations()

async function query(filterBy = { txt: '', genre: '' }) {
    let stations = await storageService.query(STORAGE_KEY)
  
    return stations
}
function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}
function ensureSong(song) {
    const id = song.id || makeId();
    const imgURL = song.imgURL || (song.thumbnails && song.thumbnails.length > 0 ? song.thumbnails[0].url : '');

    const formattedDuration = song.duration
        ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`
        : '';

    return {
        id,
        title: song.title || '',
        artist: song.artist || '',
        album: song.album || '',
        videoId: song.videoId || '',
        imgURL,
        duration: formattedDuration,
    };
}


async function getSongById(songId) {
    const stations = await query()

    for (let station of stations) {
        const song = station.songs.find(song => song.id === songId)
        if (song) {
            return song
        }
    }

    return null
}

async function removeStation(stationId) {
    await storageService.remove(STORAGE_KEY, stationId)
}

async function saveStation(station) {
    const stationToSave = {
        _id: station._id || makeId(),
        name: station.name,
        imgURL: station.imgURL || gImg,
        songs: station.songs || [],
         description: station.description || '',
         totalDuration: calculateTotalDuration(station.songs || []),
    }
    return station._id
        ? await storageService.put(STORAGE_KEY, stationToSave)
        : await storageService.post(STORAGE_KEY, stationToSave)
}

async function removeSong(song, stationId) {
    // let stations = await storageService.query(STORAGE_KEY)
    // const stationIdx = stations.findIndex(station => station._id === stationId)
    // if (stationIdx === -1) throw new Error('Station not found')
    // const songIdx = stations[stationIdx].songs.findIndex(song => song.id === songId)
    // if (songIdx === -1) throw new Error('Song not found in station')
    // stations[stationIdx].songs.splice(songIdx, 1)
    // await saveToStorage(STORAGE_KEY, stations)
    // return stations[stationIdx]
}

async function addSong(song, stationId) {
    let stations = await storageService.query(STORAGE_KEY)

    const stationIdx = stations.findIndex(station => station._id === stationId)
    if (stationIdx === -1) throw new Error('Station not found')

    stations[stationIdx].songs.push(song)
    await saveToStorage(STORAGE_KEY, stations)

    return stations[stationIdx]
}

async function addSongToLikedSongs(song) {
    const likedSongsStation = await getLikedSongsStation()

    const isSongLiked = likedSongsStation.songs.some(likedSong => likedSong.id === song.id)
    if (isSongLiked) return likedSongsStation

    likedSongsStation.songs.push(song)
    await saveStation(likedSongsStation)
    return likedSongsStation
}

async function removeSongFromLikedSongs(songId) {
    const likedSongsStation = await getLikedSongsStation()

    likedSongsStation.songs = likedSongsStation.songs.filter(song => song.id !== songId)
    await saveStation(likedSongsStation)
    return likedSongsStation
}


async function getLikedSongsStation() {
    let stations = await storageService.query(STORAGE_KEY)
    let likedSongsStation = stations.find(station => station.name === 'Liked Songs')

    return likedSongsStation || null
}

async function addStation(name, genre) {
    const newStation = {
        _id: makeId(),
        name,
    }
    await storageService.post(STORAGE_KEY, newStation)
    return newStation
}

async function _createStations() {
    let stations = loadFromStorage(STORAGE_KEY)

    if (!stations || !stations.length) {
        stations = []
        // Create several example stations
        stations.push(_createStation('Liked Songs', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731428252/liked-songs_fdevoi.png'));
        stations.push(_createStation('TECHNO 2024', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606719/techno-2024_fzehuc.jpg', 'By kfirSandberg'));
        stations.push(_createStation('Beast Mode', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606720/beast-mode_n95afc.jpg', 'Get your beast mode on!'));
        // stations.push(_createStation('Running Motivation 2024', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606719/running_vnrqas.jpg'));
        stations.push(_createStation('ישראלי', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606719/%D7%99%D7%A9%D7%A8%D7%90%D7%9C%D7%99_btks2v.jpg', 'kfirSandberg'));
        stations.push(_createStation('הלהיטים הגדולים של ישראל', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/%D7%94%D7%9C%D7%94%D7%99%D7%98%D7%99%D7%9D_%D7%A9%D7%9C_%D7%99%D7%A9%D7%A8%D7%90%D7%9C_kyxngb.jpg', 'הפלייליסט הכי גדול בישראל, עם השירים הכי חמים של ישראל'));
        stations.push(_createStation('Top Songs - Global', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/top-songs-global_bh7xg0.jpg', 'Your weekly update of the most played tracks right now - Global.'));
        stations.push(_createStation('Top Songs - USA', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/top-songs-USA_s0xg2s.jpg', 'Your weekly update of the most played tracks right now - USA.'));
        stations.push(_createStation('Top 50 - global', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/top50_ggdj8d.jpg', 'Your daily update of the most played tracks right now - Global.'));
        stations.push(_createStation('Viral 50 - Global', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/viral50_yks0vl.jpg', 'Your daily update of the most viral tracks right now - Global.'));
        stations.push(_createStation('2000s Hip-Hop', makeId(), 'https://res.cloudinary.com/dhzo7e3yx/image/upload/v1731606718/2000shiphop_f9tiqf.jpg', 'Taking it back to the 2000s. Cover: Kid Cudi'));
        stations.push(_createStation('Israeli Vibes', makeId(), ''));
        stations.push(_createStation('Rock Vibes', makeId(), ''));
        saveToStorage(STORAGE_KEY, stations);

    }
    return stations
}

function _createStation(name, _id, imgURL = gImg, stationSubtitle) {
    const station = getEmptyStation(name, _id, stationSubtitle)
    if (station.songs && station.songs.length > 0 && !imgURL) {
        station.imgURL = station.songs[0].imgURL // Use the first song's imgURL if exists
    }
    if (imgURL) {
        station.imgURL = imgURL
    }

    return station
}

function getEmptyStation(name, _id = '', stationSubtitle = '') {
    let playlistCount = parseInt(localStorage.getItem('playlistCount'), 10) || 0
    playlistCount += 1
    const newStationName = name || `My Playlist #${playlistCount}`
    localStorage.setItem('playlistCount', playlistCount)
    return {
        name: newStationName,
        songs: getSongsForStation(newStationName) || [],
        _id,
        stationSubtitle
    }
}

function getVideoIdFromUrl(url) {
    if (!url) return
    const urlObj = new URL(url)
    return urlObj.searchParams.get('v')
}

function calculateTotalDuration(songs) {
    let totalSeconds = 0;
if(!songs)return 
    songs.forEach(song => {
        if (song.duration) {
            const parts = song.duration.split(':');
            const minutes = parseInt(parts[0], 10);
            const seconds = parseInt(parts[1], 10);
            totalSeconds += minutes * 60 + seconds;
        }
    });

    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const result = [];
    if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) result.push(`${minutes} min`);
    if (seconds > 0) result.push(`${seconds} sec`);
    console.log('Calculated Duration:', result.join(' '));
    return result.join(' ');
}



function getSongsForStation(playlistName) {
    const songLibrary = {
        'Rock Vibes': [
            {
                title: 'Whole Lotta Love',
                artist: 'Led Zeppelin',
                album: 'Led Zeppelin II',
                duration: '5:34',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HQmmM_qwG4k'),
                id: makeId(),
                imgURL: 'https://res.cloudinary.com/dwosnxdmg/image/upload/v1731495976/rock_vibes_s9zplp.jpg',
            },
            {
                title: 'Back In Black',
                artist: 'AC/DC',
                album: 'Back In Black',
                duration: '4:15',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=pAgnJDJN4VA'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/pAgnJDJN4VA/mqdefault.jpg',
            },
            {
                title: 'Bohemian Rhapsody',
                artist: 'Queen',
                album: 'A Night at the Opera',
                duration: '5:55',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=fJ9rUzIMcZQ'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg',
            },
            {
                title: 'Stairway to Heaven',
                artist: 'Led Zeppelin',
                album: 'Led Zeppelin IV',
                duration: '8:02',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=qHFxncb1gRY'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/qHFxncb1gRY/mqdefault.jpg',
            },
            {
                title: 'Hotel California',
                artist: 'Eagles',
                album: 'Hotel California',
                duration: '6:30',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=EqPtz5qN7HM'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/EqPtz5qN7HM/mqdefault.jpg',
            },
            {
                title: 'Sweet Child O’ Mine',
                artist: 'Guns N’ Roses',
                album: 'Appetite for Destruction',
                duration: '5:56',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=1w7OgIMMRc4'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/1w7OgIMMRc4/mqdefault.jpg',
            },
            {
                title: 'Comfortably Numb',
                artist: 'Pink Floyd',
                album: 'The Wall',
                duration: '6:22',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=8pWv_lfJHzs'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/8pWv_lfJHzs/mqdefault.jpg',
            },
            {
                title: 'Born to Run',
                artist: 'Bruce Springsteen',
                album: 'Born to Run',
                duration: '4:30',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Md3A2kZgdXM'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/Md3A2kZgdXM/mqdefault.jpg',
            },
            {
                title: 'Dream On',
                artist: 'Aerosmith',
                album: 'Aerosmith',
                duration: '4:28',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=9b2W5UtggKo'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/9b2W5UtggKo/mqdefault.jpg',
            },
            {
                title: 'Smells Like Teen Spirit',
                artist: 'Nirvana',
                album: 'Nevermind',
                duration: '5:01',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=hTWKbfoikeg'),
                id: makeId(),
                imgURL: 'https://i.ytimg.com/vi/hTWKbfoikeg/mqdefault.jpg',
            },
        ],
        'Israeli Vibes': [
            {
                title: 'Cowboy',
                artist: 'Tuna',
                album: 'Tuna Album',
                duration: '3:50',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=yRAvfo3sHFs'),
                id: makeId(),
                imgURL: 'https://patiphon.co.il/Res/Artists/3768/1/d6c0638f-ab40-472d-ba8b-047046e6939a.jpg',
            },
            {
                title: 'Rabot Hadrahim',
                artist: 'דניאל סלומון ודנה עדיני',
                album: 'Rabot Hadrahim',
                duration: '4:10',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Dpu0Cc1ZQ1g'),
                id: makeId(),
                imgURL: 'https://upload.wikimedia.org/wikipedia/he/thumb/c/ca/%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp/592px-%D7%A8%D7%91%D7%95%D7%AA_%D7%94%D7%93%D7%A8%D7%9B%D7%99%D7%9D_-_%D7%93%D7%A0%D7%99%D7%90%D7%9C_%D7%A1%D7%9C%D7%95%D7%9E%D7%95%D7%9F.webp.png',
            },
            {
                title: 'פלסטרים',
                artist: 'אושר כהן',
                album: 'פלסטרים',
                duration: '3:30',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=psKClFBw5S4'),
                id: makeId(),
                imgURL: 'https://i1.sndcdn.com/artworks-sz8gJhk2rZYd3P6W-gDOI4g-t500x500.jpg',
            },
        ],
        'TECHNO 2024': [
            {
                title: 'Higher Power',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '3:28',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=RHnVcEubpUA'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/RHnVcEubpUA/maxresdefault.jpg',
            },
            {
                title: 'Last Night - Anyma x Layton Giordani Remix',
                artist: 'Loofy',
                album: 'Last Night (Anyma x Layton Giordani Remix)',
                duration: '4:16',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=PuH-7swYK5c'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/PuH-7swYK5c/maxresdefault.jpg',
            },
            {
                title: 'Eternity - Massano Remix',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '6:02',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=BgeT7s2e1HM'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/BgeT7s2e1HM/maxresdefault.jpg',
            },
            {
                title: 'Say Yes To Heaven - Anyma Remix',
                artist: 'Lana Del Rey',
                album: 'Say Yes To Heaven (Anyma Remix)',
                duration: '3:42',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=2tkhX5eJZdg'),
                id: makeId(),
                imgURL: 'http://i3.ytimg.com/vi/2tkhX5eJZdg/hqdefault.jpg',
            },
            {
                title: 'Angel 1',
                artist: 'Anyma',
                album: 'Genesys',
                duration: '5:46',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=cD_m33pz8xc'),
                id: makeId(),
                imgURL: 'http://i3.ytimg.com/vi/cD_m33pz8xc/hqdefault.jpg',
            },
            {
                title: 'I Will Find You',
                artist: 'Mathame',
                album: 'I Will Find You',
                duration: '3:29',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=HL7DzUpvnEM'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/HL7DzUpvnEM/maxresdefault.jpg',
            },
            {
                title: 'Move',
                artist: 'Adam Port',
                album: 'Move',
                duration: '2:57',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=95dB-ObZ7Ho'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/95dB-ObZ7Ho/maxresdefault.jpg',
            },
        ],
        'Beast Mode': [
            {
                title: 'Where You Are',
                artist: 'John Summit',
                album: 'Where You Are',
                duration: '3:56',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=5BqjhUmldDc'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/5BqjhUmldDc/maxresdefault.jpg',
            },
            {
                title: 'Losing Control',
                artist: 'Odd Mob',
                album: 'Losing Control)',
                duration: '2:45',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=mspKUTcwy2I'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/mspKUTcwy2I/maxresdefault.jpg',
            },
            {
                title: 'Monster',
                artist: 'Don Diablo',
                album: 'Monster',
                duration: '2:24',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=D8mis7kcTZU'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/D8mis7kcTZU/maxresdefault.jpg',
            },
            {
                title: 'Turn On The Light',
                artist: 'Swedish House Mafia',
                album: 'Turn On The Light',
                duration: '4:13',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=Q22MCFC0CP0'),
                id: makeId(),
                imgURL: 'https://www.youtube.com/watch?v=Q22MCFC0CP0',
            },
            {
                title: 'Boost Up',
                artist: 'Fisher',
                album: 'Boost Up',
                duration: '3:31',
                videoId: getVideoIdFromUrl('https://www.youtube.com/watch?v=ynT7jh5927M'),
                id: makeId(),
                imgURL: 'https://i3.ytimg.com/vi/ynT7jh5927M/maxresdefault.jpg',
            }
        ],
        'Running Motivation 2024': [
            {
                title: 'Seven Nation Army',
                artist: 'DJ Fluke',
                album: 'Seven Nation Army',
                duration: '3:28',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Prada',
                artist: 'cassö,RAYE,D-Block Europe',
                album: 'Prada',
                duration: '4:16',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'When We Were Young (The Logical Song)',
                artist: 'David Guetta,Kim Petras',
                album: 'When We Were Young (The Logical Song)',
                duration: '6:02',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Crush Me Down (You Spin Me Around)',
                artist: 'Blasterjaxx,Naeleck,3rd Wall',
                album: 'Crush Me Down (You Spin Me Around)',
                duration: '3:42',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Day-O',
                artist: 'Naeleck',
                album: 'Day-O',
                duration: '5:46',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            }
        ],
        'ישראלי': [
            {
                title: 'היא כל כך יפה',
                artist: 'צפוף באוזן',
                album: 'Kaveret',
                duration: '3:28',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'תתארו לכם',
                artist: 'שפויים',
                album: 'Shlomo Artzi',
                duration: '4:16',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'עטור מצחך',
                artist: 'משירי אברהם חלפי',
                album: 'Arik Einstein,Yoni Rechter',
                duration: '6:02',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'גיטרה וכינור',
                artist: 'מוסקט',
                album: 'Arik Einstein,Shalom Hanoch',
                duration: '3:42',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Lo Yachol Lehorid Mimench Et HaEynaim',
                artist: 'Bernard & Louise',
                album: 'Meir Ariel',
                duration: '5:46',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            }
        ],
        'TECHNO 2024': [
            {
                title: 'Higher Power',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '3:28',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Last Night - Anyma x Layton Giordani Remix',
                artist: 'Loofy',
                album: 'Last Night (Anyma x Layton Giordani Remix)',
                duration: '4:16',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Eternity - Massano Remix',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '6:02',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Say Yes To Heaven - Anyma Remix',
                artist: 'Lana Del Rey',
                album: 'Say Yes To Heaven (Anyma Remix)',
                duration: '3:42',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Angel 1',
                artist: 'Anyma',
                album: 'Genesys',
                duration: '5:46',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            }
        ],
        'TECHNO 2024': [
            {
                title: 'Higher Power',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '3:28',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Last Night - Anyma x Layton Giordani Remix',
                artist: 'Loofy',
                album: 'Last Night (Anyma x Layton Giordani Remix)',
                duration: '4:16',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Eternity - Massano Remix',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '6:02',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Say Yes To Heaven - Anyma Remix',
                artist: 'Lana Del Rey',
                album: 'Say Yes To Heaven (Anyma Remix)',
                duration: '3:42',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Angel 1',
                artist: 'Anyma',
                album: 'Genesys',
                duration: '5:46',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            }
        ],
        'TECHNO 2024': [
            {
                title: 'Higher Power',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '3:28',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Last Night - Anyma x Layton Giordani Remix',
                artist: 'Loofy',
                album: 'Last Night (Anyma x Layton Giordani Remix)',
                duration: '4:16',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Eternity - Massano Remix',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '6:02',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Say Yes To Heaven - Anyma Remix',
                artist: 'Lana Del Rey',
                album: 'Say Yes To Heaven (Anyma Remix)',
                duration: '3:42',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Angel 1',
                artist: 'Anyma',
                album: 'Genesys',
                duration: '5:46',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            }
        ],
        'TECHNO 2024': [
            {
                title: 'Higher Power',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '3:28',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Last Night - Anyma x Layton Giordani Remix',
                artist: 'Loofy',
                album: 'Last Night (Anyma x Layton Giordani Remix)',
                duration: '4:16',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Eternity - Massano Remix',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '6:02',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Say Yes To Heaven - Anyma Remix',
                artist: 'Lana Del Rey',
                album: 'Say Yes To Heaven (Anyma Remix)',
                duration: '3:42',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Angel 1',
                artist: 'Anyma',
                album: 'Genesys',
                duration: '5:46',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            }
        ],
        'TECHNO 2024': [
            {
                title: 'Higher Power',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '3:28',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Last Night - Anyma x Layton Giordani Remix',
                artist: 'Loofy',
                album: 'Last Night (Anyma x Layton Giordani Remix)',
                duration: '4:16',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Eternity - Massano Remix',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '6:02',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Say Yes To Heaven - Anyma Remix',
                artist: 'Lana Del Rey',
                album: 'Say Yes To Heaven (Anyma Remix)',
                duration: '3:42',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Angel 1',
                artist: 'Anyma',
                album: 'Genesys',
                duration: '5:46',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            }
        ],
        'TECHNO 2024': [
            {
                title: 'Higher Power',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '3:28',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Last Night - Anyma x Layton Giordani Remix',
                artist: 'Loofy',
                album: 'Last Night (Anyma x Layton Giordani Remix)',
                duration: '4:16',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Eternity - Massano Remix',
                artist: 'Anyma',
                album: 'genesys II',
                duration: '6:02',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Say Yes To Heaven - Anyma Remix',
                artist: 'Lana Del Rey',
                album: 'Say Yes To Heaven (Anyma Remix)',
                duration: '3:42',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            },
            {
                title: 'Angel 1',
                artist: 'Anyma',
                album: 'Genesys',
                duration: '5:46',
                videoId: getVideoIdFromUrl(''),
                id: makeId(),
                imgURL: '',
            }
        ],
    }

    return songLibrary[playlistName] || []
}
