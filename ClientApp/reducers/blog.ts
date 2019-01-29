import { Article } from "../types/blog";
import { KnownAppAction } from "./reducer";

/**
 * Article CRUD reducer state type.
 */
type ArticleCrudReducerState = Article[];

/**
 * Article select reducer state type.
 */
type ArticleSelectReducerState = number | undefined;

/**
 * Article reducer(composed of CRUD, Select, request reducers) state type.
 */
type ArticleReducerState = {
    /**
     * Whether fetch resulted in error.
     */
    fetchError: Error | undefined,

    /**
     * Whether there is fetching article(s).
     */
    isFetching: boolean,

    /**
     * Fetched articles.
     */
    items: Article[],

    /**
     * Id of selected article.
     */
    selectedArticleId: number | undefined,
}

/**
 * Reducer for CRUD about articles.
 * @param state Previous state, only containing articles.
 * @param action Action to perform on previous state.
 */
export function articlesCrudReducer(state = [] as ArticleCrudReducerState, action: KnownAppAction) {
    switch (action.type) {
        case "ADD_ARTICLE":
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    subtitle: action.subtitle,
                    author: action.author,
                    content: action.content,
                    createdAt: new Date(), // TODO: Does this should be set here?
                    updatedAt: new Date(), // TODO: Does this should be set here?
                },
            ];
        case "UPDATE_ARTICLE":
            return state.map((article) => {
                if (article.id === action.id) {
                    article.author = action.author || article.author;
                    article.content = action.content || article.content;
                    article.subtitle = action.subtitle || article.subtitle;
                    article.title = action.title || article.title;
                    article.updatedAt = new Date(); // TODO: Does this should be set like this?
                    return article;
                } else {
                    return article;
                }
            });
        case "REMOVE_ARTICLE":
            return state.filter((article) => article.id !== action.id);
        default:
            return state;
    }
}

/**
 * Reducer for single article selection.
 * @param state Previous state, only containing currently selected article's id.
 * @param action Action to perform on previous state.
 */
export function articleSelectReducer(state = undefined as ArticleSelectReducerState, action: KnownAppAction) {
    switch (action.type) {
        case "SELECT_ARTICLE":
            return action.id;
        default:
            return state;
    }
}

/**
 * Reducer for multiple articles request related actions.
 * @param state Previous state, only containing state articles.
 * @param action Action to perform on previous state.
 */
export function articlesRequestReducer(state = { fetchError: undefined, isFetching: false, items: [], selectedArticleId: undefined } as ArticleReducerState, action: KnownAppAction) {
    switch (action.type) {
        case "REQUEST_ARTICLES":
            return {
                ...state,
                fetchError: undefined,
                isFetching: true,
            };
        case "RECEIVE_ARTICLES":
            return {
                fetchError: undefined,
                items: action.items,
                isFetching: false,
                selectedArticleId: undefined,
            };
        case "REQUEST_ARTICLES_FAILURE":
            return {
                ...state,
                fetchError: new Error(action.errorMessage),
                isFetching: false,
            }
        default:
            return state;
    }
}

/**
 * Reducer for single article request related actions.
 * @param state Previous state, only containing state articles.
 * @param action Action to perform on previous state.
 */
export function articleRequestReducer(state = { fetchError: undefined, isFetching: false, items: [], selectedArticleId: undefined } as ArticleReducerState, action: KnownAppAction) {
    switch (action.type) {
        case "REQUEST_ARTICLE":
            return {
                ...state,
                fetchError: undefined,
                isFetching: true,
            };
        case "RECEIVE_ARTICLE":
            return {
                fetchError: undefined,
                items: state.items
                    .filter((article) => article.id !== action.article.id)
                    .concat([action.article]),
                isFetching: false,
                selectedArticleId: undefined,
            }
        case "REQUEST_ARTICLE_FAILURE":
            return {
                ...state,
                fetchError: new Error(action.errorMessage),
                isFetching: false,
            }
        default:
            return state;
    }
}

/**
 * Reducer for articles.
 * @param state Previous state, only containing state articles.
 * @param action Action to perform on previous state.
 */
export function articlesReducer(state = { fetchError: undefined, isFetching: false, items: [] as Article[], selectedArticleId: undefined } as ArticleReducerState, action: KnownAppAction) {
    switch (action.type) {
        case "ADD_ARTICLE":
        case "REMOVE_ARTICLE":
        case "UPDATE_ARTICLE":
            return {
                ...state,
                items: articlesCrudReducer(state.items, action),
            };
        case "SELECT_ARTICLE":
            return {
                ...state,
                selectedArticleId: articleSelectReducer(state.selectedArticleId, action),
            }
        case "REQUEST_ARTICLES":
        case "RECEIVE_ARTICLES":
            return articlesRequestReducer(state, action);
        case "REQUEST_ARTICLE":
        case "RECEIVE_ARTICLE":
            return articleRequestReducer(state, action)
        default:
            return state;
    }
}
