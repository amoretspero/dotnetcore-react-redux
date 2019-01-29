import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { KnownBookAction } from "actions/book";
import { combineReducers } from "redux";
import { Book } from "../types/book";
import { visibilityFilterReducer, booksReducer } from "./book";
import { Article } from "../types/blog";
import { articlesReducer } from "./blog";
import { KnownBlogAction } from "../actions/blog";

/**
 * State for application.
 */
export interface AppState {
    visibilityFilter: BookVisibilityFilter;
    books: {
        isFetching: boolean,
        items: Book[],
    },
    articles: {
        fetchError: Error | undefined,
        isFetching: boolean,
        items: Article[],
        selectedArticleId: number | undefined,
    }
}

/**
 * Used when `ThunkAction` type was not provided.
 */
export type AppThunkAction<TAction extends { type: string }> = {
    thunk: (dispatch: (action: TAction) => void, getState: () => AppState) => void;
    type: TAction["type"];
}

/**
 * Known actions for this application.
 */
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
