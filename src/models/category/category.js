class Category {
    constructor() {
        this._category_id = '';
        this._category_name = '';
        this._trans_type_id = '';
    }
    
    get category_id() {
        return this._category_id;
    }

    set category_id(value) {
        this._category_id = value;
    }

    get category_name() {
        return this._category_name;
    }

    set category_name(value) {
        this._category_name = value;
    }

    get trans_type_id() {
        return this._trans_type_id;
    }

    set trans_type_id(value) {
        this._trans_type_id = value;
    }
}

export default Category;