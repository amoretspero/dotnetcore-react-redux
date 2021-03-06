import { AppState } from "../../reducers/reducer";
import { BookStatus } from "../../helpers/enums/bookStatus";
import { BookVisibilityFilter } from "../../helpers/enums/BookVisibilityFilters";
import { KnownBookAction, bookActionCreators } from "../../actions/book";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Book } from "../../types/book";
import { BookList } from "../../components/BookList";

/**
 * Helper function to get visible books from current state via visibility filter.
 * @param books Current state's books.
 * @param filter Current state's filter.
 */
function getVisibleBooks(books: Book[], filter: BookVisibilityFilter) {
    switch (filter) {
        case BookVisibilityFilter.SHOW_ALL:
            return books;
        case BookVisibilityFilter.PENDING:
            return books.filter((book) => book.status === BookStatus.PENDING);
        case BookVisibilityFilter.READING:
            return books.filter((book) => book.status === BookStatus.READING);
        case BookVisibilityFilter.FINISHED:
            return books.filter((book) => book.status === BookStatus.FINISHED);
        case BookVisibilityFilter.WISHLIST:
            return books.filter((book) => book.status === BookStatus.WISHLIST);
        default:
            return [];
    }
}

/**
 * Maps current state to container component's props.
 * @param state State to map to props of container component.
 */
function mapStateToProps(state: AppState) {
    return {
        books: getVisibleBooks(state.books.items, state.visibilityFilter),
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
