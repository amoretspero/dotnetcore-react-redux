import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { KnownBookAction } from "../actions/book";
import { Book } from "../types/book";

/**
 * Reducer for visibilityFilter.
 * @param state Previous state, only containing visibilityFilter.
 * @param action Action to perform on previous state.
 */
export function visibilityFilterReducer(state = BookVisibilityFilter.SHOW_ALL, action: KnownBookAction) {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.visibilityFilter;
        default:
            return state;
    }
}

/**
 * Reducer for books.
 * @param state Previous state, only containing books.
 * @param action Action to perform on previous state.
 */
export function booksReducer(state = [] as Book[], action: KnownBookAction) {
    switch (action.type) {
        case "ADD_BOOK":
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    author: action.author,
                    status: action.status,
                }
            ];
        case "CHANGE_BOOK_STATE":
            return state.map((book) => {
                if (book.id === action.id) {
                    book.status = action.status;
                    return book;
                } else {
                    return book;
                }
            });
        case "REMOVE_BOOK":
            return state.filter((book) => book.id !== action.id);
        case "UPDATE_BOOK":
            return state.map((book) => {
                if (book.id === action.id) {
                    book.title = action.title || book.title;
                    book.author = action.author || book.author;
                    return book;
                } else {
                    return book;
                }
            });
        default:
            return state;
    }
}