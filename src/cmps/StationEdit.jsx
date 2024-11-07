
export function StationEdit() {

	return <form className="station-edit" >
		<h2>Edit details</h2>
		<img src="" alt="station img" />
		<button>upload img</button>
		<select >
			<textarea name="txt" >playlist name</textarea>
			<textarea name="txt" >playlist description</textarea>
		</select>
		<button>save</button>
		<p>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
	</form>

}