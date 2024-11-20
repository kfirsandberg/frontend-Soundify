import { useEffect, useState, forwardRef } from 'react'
import { updateStation } from '../store/actions/station.actions'
import { uploadService } from '../services/upload.service'

const StationEdit = forwardRef(({ station, onClose, onImageUpload, openFileUpload }, ref) => {
    const [editedStation, setEditedStation] = useState({ ...station })
    const [uploadedImgURL, setUploadedImgURL] = useState(station?.images[0]?.url)

    useEffect(() => {
        if (openFileUpload) {
            document.getElementById('imgUpload').click()
        }
    }, [openFileUpload])

    console.log(station)

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
        const updatedStation = {
            ...editedStation,
            images: uploadedImgURL ? [{ url: uploadedImgURL }] : editedStation.images,
        };


        updateStation(updatedStation);
        onClose();
    }


    function renderStationImage() {
        if (station.imgURL === null) {
            const imageSrc = uploadedImgURL || station?.images?.[0]?.url || '';

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
        return <img className="playlist-image" src={imageSrc} alt="playlist image" />
    }

    return (
        <div className="station-edit" ref={ref}>
            <div className="modal-header">
                <h2>Edit details</h2>
                <button onClick={onClose} className="close-modal-btn">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        data-encore-id="icon"
                        role="img"
                        aria-label="Close"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="close-btn-icon">
                        <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z" /></svg>
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
})

export { StationEdit }
