import { BookVisibilityFilters } from "../helpers/enums/BookVisibilityFilters";
import { BookStatus } from "helpers/enums/bookStatus";
import { KnownBookAction } from "actions/book";
import { combineReducers } from "redux";

export interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
}

export interface BookState {
    visibilityFilter: BookVisibilityFilters;
    books: Book[];
}

const initialState: BookState = {
    visibilityFilter: BookVisibilityFilters.SHOW_ALL,
    books: [],
};

export function visibilityFilterReducer(state = BookVisibilityFilters.SHOW_ALL, action: KnownBookAction) {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.visibilityFilter;
        default:
            return state;
    }
}

export function bookReducer(state = [] as Book[], action: KnownBookAction) {
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

const bookListReducer = combineReducers<BookState, KnownBookAction>({
    visibilityFilter: visibilityFilterReducer,
    books: bookReducer,
})

export default bookListReducer;
