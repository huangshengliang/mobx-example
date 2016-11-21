import { observable, transaction } from 'mobx';

class Book {
    id = null;
    title = '';
    subtitle = '';
    description = '';
    image = '';
    isbn = '';
    constructor(id, title, subtitle, description, image, isbn) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.image = image;
        this.isbn = isbn;
    }
}

class EbookStore {
    @observable
    query = '';

    @observable
    records = [];

    @observable
    page = 1;

    @observable
    total = 0;

    @observable
    isLoading = false;

    fetchBooks(searchText, page = 1) {
        let that = this;
        transaction(() => {
            this.query = searchText;
            this.isLoading = true;
            this.total = 0;
            this.records.length = 0;
        });
        transaction(() => {
            fetch(`http://it-ebooks-api.info/v1/search/${searchText}/page/${page}`)
                .then((resp) => resp.json())
                .then((json) => {
                    that.page = json.Page;
                    that.total = json.Total;
                    that.isLoading = false;
                    if (that.total > 0) {
                        that.records = json.Books.map((book) => {
                            return new Book(book.ID, book.Title, book.Subtitle, book.Description, book.Image, book.isbn);
                        });
                    } else {
                        that.records = [];
                    }
                })
                .catch((error) => {
                    that.isLoading = false;
                    console.log(error.stack);
                });
        });
    }
}

const store = new EbookStore();

export default store;
