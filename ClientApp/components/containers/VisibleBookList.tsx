import { BookState } from "../../reducers/book";
import { BookStatus } from "../../helpers/enums/bookStatus";
import { BookVisibilityFilters } from "../../helpers/enums/BookVisibilityFilters";
import { KnownBookAction, bookActionCreators } from "../../actions/book";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Book } from "../../types/book";
import { BookList } from "components/BookList";

/**
 * Helper function to get visible books from current state via visibility filter.
 * @param books Current state's books.
 * @param filter Current state's filter.
 */
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
        case BookVisibilityFilters.WISHLIST:
            return books.filter((book) => book.status === BookStatus.WISHLIST);
        default:
            return [];
    }
}

/**
 * Maps current state to container component's props.
 * @param state State to map to props of container component.
 */
function mapStateToProps(state: BookState) {
    return {
        books: getVisibleBooks(state.books, state.visibilityFilter),
    }
}

/**
 * Maps dispatches to container component's props.
 * @param dispatch Dispatch to map to props of container component.
 */
function mapDispatchToProps(dispatch: Dispatch<KnownBookAction>) {
    return {
        addBook: bookActionCreators.addBookActionCreator,
    };
}

/**
 * Container component, created by connecting state, dispatch to existing component.
 */
export const VisibleBookList = connect(mapStateToProps, mapDispatchToProps)(BookList);
