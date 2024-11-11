export function StationEdit() {
    return (
        <div className="station-edit">
            <form>
            <h2>Edit details</h2>
                <div className="station-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        data-testid="track"
                        viewBox="0 0 24 24"
                        class="Svg-sc-ytk21e-0 bneLcE"
                    >
                        <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z" />
                    </svg>
                </div>
                <select>
                    <textarea name="txt">playlist name</textarea>
                    <textarea name="txt">Add an optional description</textarea>
                </select>
                <button>save</button>
                <p>
                    By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure
                    you have the right to upload the image.
                </p>
            </form>
        </div>
    )
}
