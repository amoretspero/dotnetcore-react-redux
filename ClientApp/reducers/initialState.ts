import { AppState } from "./reducer";
import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { BookStatus } from "../helpers/enums/bookStatus";
import { DateTime } from "luxon";

/**
 * Initial state.
 */
export const initialState: AppState = {
    visibilityFilter: BookVisibilityFilter.SHOW_ALL,
    books: {
        isFetching: false,
        items: [],
    },
    articles: {
        fetchError: undefined,
        isFetching: false,
        items: [],
        selectedArticleId: undefined,
    },
    authentication: {
        isLoggedIn: false,
        isLoggingIn: false,
        user: undefined,
        fetchError: undefined,
    },
    registration: {
        isRegistering: false,
        fetchError: undefined,
    }
};