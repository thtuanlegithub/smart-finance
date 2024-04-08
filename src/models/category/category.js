class Category {
    constructor() {
        this.category_id = '';
        this.category_name = '';
        this.trans_type_id = '';
    }

    get category_id() {
        return this.category_id;
    }

    set category_id(value) {
        this.category_id = value;
    }

    get category_name() {
        return this.category_name;
    }

    set category_name(value) {
        this.category_name = value;
    }

    get trans_type_id() {
        return this.trans_type_id;
    }

    set trans_type_id(value) {
        this.trans_type_id = value;
    }
}

export default Category;