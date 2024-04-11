import { Category } from '../../../models';

class CategoryBuilder {
    constructor() {
        this.category = new Category();
    }

    setCategoryId(categoryId) {
        this.category.category_id = categoryId;
        return this;
    }

    setCategoryName(categoryName) {
        this.category.category_name = categoryName;
        return this;
    }

    setTransTypeId(transTypeId) {
        this.category.trans_type_id = transTypeId;
        return this;
    }

    build() {
        return this.category;
    }
}

export default CategoryBuilder;
