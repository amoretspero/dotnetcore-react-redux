import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { KnownBookAction, KnownBookThunkAction } from "actions/book";
import { combineReducers } from "redux";
import { Book } from "../types/book";
import { visibilityFilterReducer, booksReducer } from "./book";
import { Article } from "../types/blog";
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

export type AppThunkAction<TAction extends { type: string }> = {
    thunk: (dispatch: (action: TAction) => void, getState: () => AppState) => void;
    type: TAction["type"];
}

export type KnownSyncAction =
    KnownBookAction |
    KnownBlogAction

export type KnownThunkAction =
    KnownBookThunkAction

export type KnownAppAction =
    KnownSyncAction |
    AppThunkAction<KnownThunkAction>

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
