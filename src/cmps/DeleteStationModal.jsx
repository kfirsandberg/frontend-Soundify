import React from 'react'

export function DeleteStationModal({ playlistName, onConfirm, onCancel }) {
    console.log('Rendering DeleteStationModal');

    return (
        <div className="delete-station-modal">
            <div className="delete-modal">
                <h2>Delete from Your Library?</h2>
                <p>This will delete <strong>{playlistName}</strong> from Your Library.</p>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="delete-btn" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
