import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { KnownBookAction } from "actions/book";
import { combineReducers } from "redux";
import { Book } from "../types/book";
import { visibilityFilterReducer, booksReducer } from "./book";
import { Article } from "types/blog";
import { articlesReducer } from "./blog";
import { KnownBlogAction } from "../actions/blog";

/**
 * State for book section.
 * 
 * TODO: Must combined with other states to make single state of app.
 */
export interface AppState {
    visibilityFilter: BookVisibilityFilter;
    books: {
        isFetching: boolean,
        items: Book[],
    },
    articles: {
        isFetching: boolean,
        items: Article[];
    }
}

export type KnownAppAction =
    KnownBookAction |
    KnownBlogAction

/**
 * Combined reducer of visibilityFilter and book reducers.
 * 
 * This combined reducer is root reducer for book section.
 */
const reducer = combineReducers<AppState, KnownAppAction>({
    visibilityFilter: visibilityFilterReducer,
    books: booksReducer,
    articles: articlesReducer,
})

export default reducer;
