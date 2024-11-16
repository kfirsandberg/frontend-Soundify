import { useNavigate } from 'react-router-dom'

export function CategoryPreview({ category }) {
    const navigate = useNavigate()

    // function onNavigate() {
    //     navigate(`/category/${category.id}`)
    // }

    return (
        <div
            className="category-preview"
            style={{
                backgroundColor: category.bgColor,
            }}
        >
            {/* <div className="category-preview" onClick={onNavigate}> */}
            <img src={category.imgURL} alt={category.name} className="category-img" />
            <h2 className="category-title">{category.name}</h2>
        </div>
    )
}
