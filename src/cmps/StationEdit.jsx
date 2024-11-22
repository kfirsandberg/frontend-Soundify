import { useEffect, useState, forwardRef } from 'react';
import { updateStation } from '../store/actions/station.actions';
import { uploadService } from '../services/upload.service';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const StationEdit = forwardRef(({ station, onClose, onImageUpload, openFileUpload }, ref) => {
    const [editedStation, setEditedStation] = useState({ ...station });
    const [uploadedImgURL, setUploadedImgURL] = useState(station?.images[0]?.url);

    useEffect(() => {
        if (openFileUpload) {
            document.getElementById('imgUpload').click();
        }
    }, [openFileUpload]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setEditedStation((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function handleImageUpload(ev) {
        try {
            const imgData = await uploadService.uploadImg(ev);
            const url = imgData.secure_url;
            setUploadedImgURL(url);
            onImageUpload(url);
        } catch (err) {
            console.error('Error uploading image:', err);
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

    return (
        <div className="station-edit" ref={ref}>
            <div className="modal-header">
                <h2>Edit details</h2>
                <button onClick={onClose} className="close-modal-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-encore-id="icon"
                        role="img"
                        aria-label="Close"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="close-btn-icon"
                    >
                        <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z" />
                    </svg>
                </button>
            </div>
            <div className="form-container">
                <form className="edit-form">
                    <Box
                        sx={{
                            display: 'block',
                            position: 'relative',
                            width: {xl: 180 },
                            height: {  xl: 180 },
                            minWidth: 180,
                            minHeight: 180,
                            maxWidth: 180,
                            maxHeight: 232,
                            '&:hover .overlay, &:hover .edit-icon-button, &:hover .choose-photo-text': {
                                opacity: 1,
                            },
                        }}
                        onClick={() => document.getElementById('imgUpload').click()}
                    >
                        <Box
                            component="img"
                            src={uploadedImgURL || station?.images?.[0]?.url || ''}
                            alt="Station"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 1,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        />
                        {/* Overlay */}
                        <Box
                            className="overlay"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: 1,
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                            }}
                        />
                        {/* Edit Icon */}
                        <IconButton
                            className="edit-icon-button"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: 'white',
                                opacity: 0,
                                zIndex: 1,
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            <EditIcon
                                sx={{
                                    fontSize: {
                                        xs: 40,
                                        sm: 50,
                                        md: 40,
                                        lg: 70,
                                    },
                                }}
                            />
                        </IconButton>
                        {/* Choose Photo Text */}
                        <Box
                            className="choose-photo-text"
                            sx={{
                                width: 120,
                                position: 'absolute',
                                top: '70%',
                                left: { xs: '65%', sm: '60%', md: '50%' },
                                transform: 'translateX(-50%)',
                                color: 'white',
                                fontSize: {
                                    xs: '12px',
                                    sm: '14px',
                                    md: '12px',
                                    lg: '18px',
                                },
                                opacity: 0,
                            }}
                        >
                            Choose photo
                        </Box>
                        <input
                            type="file"
                            id="imgUpload"
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </Box>

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
    );
});

export { StationEdit };
