import { BookState, Book } from "reducers/bookList";
import { BookStatus } from "helpers/enums/bookStatus";
import { BookVisibilityFilters } from "helpers/enums/BookVisibilityFilters";
import { BookListProps, BookList } from "components/Book";
import { KnownBookAction, AddBookAction, bookActionCreators } from "actions/book";
import { Dispatch } from "redux";
import { connect } from "react-redux";

function getVisibleBooks(books: Book[], filter: BookVisibilityFilters) {
    switch (filter) {
        case BookVisibilityFilters.SHOW_ALL:
            return books;
        case BookVisibilityFilters.PENDING:
            return books.filter((book) => book.status === BookStatus.PENDING);
        case BookVisibilityFilters.READING:
            return books.filter((book) => book.status === BookStatus.READING);
        case BookVisibilityFilters.FINISHED:
            return books.filter((book) => book.status === BookStatus.FINISHED);
        default:
            return [];
    }
}

function mapStateToProps(state: BookState): BookListProps {
    return {
        books: getVisibleBooks(state.books, state.visibilityFilter),
    }
}

function mapDispatchToProps(dispatch: Dispatch<KnownBookAction>) {
    return {
        addBook: bookActionCreators.addBookActionCreator,
    };
}

export const VisibleBookList = connect(mapStateToProps, mapDispatchToProps)(BookList);
