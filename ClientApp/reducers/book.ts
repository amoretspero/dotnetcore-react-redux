import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { KnownBookAction } from "../actions/book";
import { Book } from "../types/book";
import { KnownAppAction } from "./reducer";

/**
 * Reducer for visibilityFilter.
 * @param state Previous state, only containing visibilityFilter.
 * @param action Action to perform on previous state.
 */
export function visibilityFilterReducer(state = BookVisibilityFilter.SHOW_ALL, action: KnownAppAction) {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.visibilityFilter;
        default:
            return state;
    }
}

/**
 * Reducer for basic CRUD actions about books.
 * @param state Previous state, only containing list of books.
 * @param action Action to perform on previous state.
 */
function booksCrudRecuder(state = [] as Book[], action: KnownAppAction) {
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
        case "RECEIVE_BOOKS":

        default:
            return state;
    }
}

/**
 * Reducer for network related actions about books.
 * @param state Previous state, only containing state of books.
 * @param action Action to perform on previous state.
 */
function booksRequestReducer(state = { isFetching: false, items: [] as Book[] }, action: KnownAppAction) {
    switch (action.type) {
        case "REQUEST_BOOKS":
            return {
                ...state,
                isFetching: true,
            };
        case "RECEIVE_BOOKS":
            return {
                ...state,
                isFetching: false,
                items: action.items,
            };
        default:
            return state;
    }
}

/**
 * Reducer for books.
 * @param state Previous state, only containing state books.
 * @param action Action to perform on previous state.
 */
export function booksReducer(state = { isFetching: false, items: [] as Book[] }, action: KnownAppAction) {
    switch (action.type) {
        case "ADD_BOOK":
        case "CHANGE_BOOK_STATE":
        case "REMOVE_BOOK":
        case "UPDATE_BOOK":
            return {
                ...state,
                items: booksCrudRecuder(state.items, action),
            };
        case "REQUEST_BOOKS":
        case "RECEIVE_BOOKS":
            return booksRequestReducer(state, action);
        default:
            return state;
    }
}