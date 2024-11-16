import { CategoryPreview } from './CategoryPreview.jsx'

export function CategoryList({ categories }) {
    return (
        <section className="category-list">
            {categories.map(category => (
                <CategoryPreview key={category.id} category={category} />
            ))}
        </section>
    )
}
