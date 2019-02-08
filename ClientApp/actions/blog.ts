import { Article } from "../types/blog";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState, KnownAppAction } from "../reducers/reducer";
import { DateTime } from "luxon";

/**
 * ADD_ARTICLE action.
 */
export interface AddArticleAction {
    /**
     * Type of action.
     */
    type: "ADD_ARTICLE";

    /**
     * Id of article to add.
     */
    id: number;

    /**
     * Title of article.
     */
    title: string;

    /**
     * Subtitle of article.
     */
    subtitle: string;

    /**
     * Author of article.
     */
    author: string;

    /**
     * Content of article.
     */
    content: string;
}

/**
 * REMOVE_ARTICLE action.
 */
export interface RemoveArticleAction {
    /**
     * Type of action.
     */
    type: "REMOVE_ARTICLE";

    /**
     * Id of article to remove.
     */
    id: number;
}

/**
 * UPDATE_ARTICLE action.
 */
export interface UpdateArticleAction {
    /**
     * Type of action.
     */
    type: "UPDATE_ARTICLE";

    /**
     * Id of article to update.
     */
    id: number;

    /**
     * Title of article.
     */
    title?: string;

    /**
     * Subtitle of article.
     */
    subtitle?: string;

    /**
     * Author of article.
     */
    author?: string;

    /**
     * Content of article.
     */
    content?: string;
}

/**
 * SELECT_ARTICLE action.
 */
export interface SelectArticleAction {
    /**
     * Type of action.
     */
    type: "SELECT_ARTICLE";

    /**
     * Id of article to select.
     */
    id: number;
}

/**
 * REQUEST_ARTICLE action.
 */
export interface RequestArticleAction {
    /**
     * Type of action.
     */
    type: "REQUEST_ARTICLE";

    /**
     * Id of an article to request.
     */
    id: number;
}

/**
 * RECEIVE_ARTICLE action.
 */
export interface ReceiveArticleAction {
    /**
     * Type of action.
     */
    type: "RECEIVE_ARTICLE";

    /**
     * Article received from network request.
     */
    article: Article;
}

/**
 * REQUEST_ARTICLE_FAILURE action.
 */
export interface RequestArticleFailureAction {
    /**
     * Type of action.
     */
    type: "REQUEST_ARTICLE_FAILURE";

    /**
     * Id of article that has failed to fetch.
     */
    id: number;

    /**
     * Error message.
     */
    errorMessage: string;
}

/**
 * REQUEST_ARTICLES action.
 */
export interface RequestArticlesAction {
    /**
     * Type of action.
     */
    type: "REQUEST_ARTICLES";
}

/**
 * RECEIVE_ARTICLES action.
 */
export interface ReceiveArticlesAction {
    /**
     * Type of action.
     */
    type: "RECEIVE_ARTICLES";

    /**
     * Articles received from network request.
     */
    items: Article[];
}

/**
 * REQUEST_ARTICLES_FAILURE action.
 */
export interface RequestArticlesFailureAction {
    /**
     * Type of action.
     */
    type: "REQUEST_ARTICLES_FAILURE";

    /**
     * Error message.
     */
    errorMessage: string;
}

/**
 * Known blog actions.
 */
export type KnownBlogAction =
    AddArticleAction |
    RemoveArticleAction |
    UpdateArticleAction |
    SelectArticleAction |
    RequestArticleAction |
    ReceiveArticleAction |
    RequestArticleFailureAction |
    RequestArticlesAction |
    ReceiveArticlesAction |
    RequestArticlesFailureAction

/**
 * Action creator for ADD_ARTICLE action.
 * @param id Id of article to add.
 * @param title Title of article.
 * @param subtitle Subtitle of article.
 * @param author Author of article.
 * @param content Content of article.
 */
function addArticleActionCreator(id: number, title: string, subtitle: string, author: string, content: string): AddArticleAction {
    return {
        type: "ADD_ARTICLE",
        id,
        title,
        subtitle,
        author,
        content,
    };
}

/**
 * Action creator for REMOVE_ARTICLE action.
 * @param id Id of article to remove.
 */
function removeArticleActionCreator(id: number): RemoveArticleAction {
    return {
        type: "REMOVE_ARTICLE",
        id,
    };
}

/**
 * Action creator for UPDATE_ARTICLE action.
 * @param id Id of article to update information.
 * @param title New title of article.
 * @param subtitle New subtitle of article.
 * @param author New author of article.
 * @param content New content of article.
 */
function updateArticleActionCreator(id: number, title?: string, subtitle?: string, author?: string, content?: string): UpdateArticleAction {
    return {
        type: "UPDATE_ARTICLE",
        id,
        title,
        subtitle,
        author,
        content,
    };
}

/**
 * Action creator for SELECT_ARTICLE action.
 * @param id Id of article to select.
 */
function selectArticleActionCreator(id: number): SelectArticleAction {
    return {
        type: "SELECT_ARTICLE",
        id,
    };
}

/**
 * Action creator for REQUEST_ARTICLE action.
 * @param id Id of article to request information.
 */
function requestArticleActionCreator(id: number): RequestArticleAction {
    return {
        type: "REQUEST_ARTICLE",
        id,
    };
}

/**
 * Action creator for RECEIVE_ARTICLE action.
 * @param article Article received from network request.
 */
function receiveArticleActionCreator(article: Article): ReceiveArticleAction {
    return {
        type: "RECEIVE_ARTICLE",
        article,
    };
}

/**
 * Action creator for REQUEST_ARTICLE_FAILURE action.
 * @param id Id of article that should have been fetched but resulted in error.
 * @param errorMessage Error message.
 */
function requestArticleFailureActionCreator(id: number, errorMessage: string): RequestArticleFailureAction {
    return {
        type: "REQUEST_ARTICLE_FAILURE",
        id,
        errorMessage,
    };
}

/**
 * Action creator for REQUEST_ARTICLES action.
 */
function requestArticlesActionCreator(): RequestArticlesAction {
    return {
        type: "REQUEST_ARTICLES",
    };
}

/**
 * Action creator for RECEIVE_ARTICLES action.
 * @param items Articles received from network request.
 */
function receiveArticlesActionCreator(items: Article[]): ReceiveArticlesAction {
    return {
        type: "RECEIVE_ARTICLES",
        items,
    };
}

/**
 * Action creator for REQUEST_ARTICLES_FAILURE action.
 * @param errorMessage Error message.
 */
function requestArticlesFailureActionCreator(errorMessage: string): RequestArticlesFailureAction {
    return {
        type: "REQUEST_ARTICLES_FAILURE",
        errorMessage,
    };
}

function articleConverter(article: any) {
    if (!article) {
        throw new Error(`Cannot convert undefined or null article.`);
    }
    return {
        ...article,
        createdAt: DateTime.fromISO(article.createdAt).toJSDate(),
        updatedAt: DateTime.fromISO(article.updatedAt).toJSDate(),
    };
}

/**
 * Thunk action creator responsible for fetching single article from server.
 * @param id Id of article to request information.
 */
function fetchArticleThunkActionCreator(id: number): ThunkAction<Promise<void>, AppState, {}, KnownAppAction> {
    return function (dispatch: ThunkDispatch<AppState, {}, KnownAppAction>, getState: () => AppState) {
        if (getState().articles.items.find((article) => article.id === id)) {
            return Promise.resolve();
        }
        dispatch(requestArticleActionCreator(id));
        return fetch(`/api/article?id=${id}`)
            .then((resp) => {
                return resp.json().then((val) => articleConverter(val));
            }, (err) => {
                console.error(`An error occured.`, err);
                dispatch(requestArticleFailureActionCreator(id, err));
            })
            .then((jsonResult) => {
                dispatch(receiveArticleActionCreator(jsonResult));
            });
    }
}

/**
 * Thunk action creator responsible for fetching articles from server.
 */
function fetchArticlesThunkActionCreator(): ThunkAction<Promise<void>, AppState, {}, KnownAppAction> {
    return function (dispatch: ThunkDispatch<AppState, {}, KnownAppAction>) {
        dispatch(requestArticlesActionCreator());
        return fetch(`/api/articles`)
            .then((resp) => {
                return resp.json().then((val) => val.map((article: any) => articleConverter(article)))
            }, (err) => {
                console.error(`An error occured.`, err);
                dispatch(requestArticlesFailureActionCreator(err));
            })
            .then((jsonResult) => {
                dispatch(receiveArticlesActionCreator(jsonResult));
            });
    }
}

/**
 * Collection of blog action creators.
 */
export const blogActionCreators = {
    addArticleActionCreator,
    removeArticleActionCreator,
    updateArticleActionCreator,
    selectArticleActionCreator,
    requestArticleActionCreator,
    receiveArticleActionCreator,
    requestArticleFailureActionCreator,
    requestArticlesActionCreator,
    receiveArticlesActionCreator,
    requestArticlesFailureActionCreator,
    fetchArticleThunkActionCreator,
    fetchArticlesThunkActionCreator,
};
