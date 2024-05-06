import categories from '../features/category/data/defaultCategory.json';

export default function getCategoryNameById(id) {
    const category = categories.find(category => category.id === id);
    return category ? category.name : 'Not found';
}