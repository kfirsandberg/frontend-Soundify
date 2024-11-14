import { useEffect, useState } from 'react'
import { updateStation } from '../store/actions/station.actions'
import { uploadService } from '../services/upload.service'

export function StationEdit({ station, onClose, onImageUpload, openFileUpload }) {
    const [editedStation, setEditedStation] = useState({ ...station })
    const [uploadedImgURL, setUploadedImgURL] = useState(station.imgURL)

    useEffect(() => {
        if (openFileUpload) {
            document.getElementById('imgUpload').click()
        }
    }, [openFileUpload])

    function handleInputChange(event) {
        const { name, value } = event.target
        setEditedStation(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    async function handleImageUpload(ev) {
        try {
            const imgData = await uploadService.uploadImg(ev)
            const url = imgData.secure_url
            setUploadedImgURL(url)
            onImageUpload(url)
        } catch (err) {
            console.error('Error uploading image:', err)
        }
    }

    function handleSave() {
        updateStation(editedStation)
        setEditedStation(prevState => ({
            ...prevState,
            imgURL: uploadedImgURL,
        }))
        updateStation({ ...editedStation, imgURL: uploadedImgURL })
        onClose()
    }

    function renderStationImage() {
        if (station.imgURL === null) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    data-testid="track"
                    viewBox="0 0 24 24"
                    className="Svg-sc-ytk21e-0 bneLcE"
                >
                    <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z" />
                </svg>
            )
        }
        return <img className="playlist-image" src={editedStation.imgURL} alt="playlist image" />
    }

    return (
        <div className="station-edit">
            <div className="modal-header">
                <h2>Edit details</h2>
                <button onClick={onClose} className="close-modal-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="348.333"
                        height="348.333"
                        viewBox="0 0 348.333 348.334"
                        className="close-btn-icon"
                    >
                        <path d="M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z" />
                    </svg>
                </button>
            </div>
            <div className="form-container">
                <form className="edit-form">
                    <div className="album-image" onClick={() => document.getElementById('imgUpload').click()}>
                        <img src={uploadedImgURL} alt="" />
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            id="imgUpload"
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div className="form-group title">
                        <label htmlFor="station-name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editedStation.name || ''}
                            onChange={handleInputChange}
                            placeholder="Enter Station Name"
                        />
                    </div>
                    <div className="form-group description">
                        <label htmlFor="station-description">Description</label>
                        <textarea
                            name="description"
                            value={editedStation.description || ''}
                            onChange={handleInputChange}
                            placeholder="Add an optional description"
                        />
                    </div>
                    <button type="button" onClick={handleSave} className="save-btn">
                        <span>Save</span>
                    </button>
                    <p className="disclaimer">
                        By proceeding, you agree to give Soundify access to the image you choose to upload. Please make
                        sure you have the right to upload the image.
                    </p>
                </form>
            </div>
        </div>
    )
}
