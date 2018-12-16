import { Article } from "types/blog";

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
    id: string;

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
    id: string;
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
    id: string;

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
 * Known blog actions.
 */
export type KnownBlogAction =
    AddArticleAction |
    RemoveArticleAction |
    UpdateArticleAction |
    RequestArticlesAction |
    ReceiveArticlesAction

/**
 * Action creator for ADD_ARTICLE action.
 * @param id Id of article to add.
 * @param title Title of article.
 * @param subtitle Subtitle of article.
 * @param author Author of article.
 * @param content Content of article.
 */
function addArticleActionCreator(id: string, title: string, subtitle: string, author: string, content: string): AddArticleAction {
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
function removeArticleActionCreator(id: string): RemoveArticleAction {
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
function updateArticleActionCreator(id: string, title?: string, subtitle?: string, author?: string, content?: string): UpdateArticleAction {
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
 * Collection of blog action creators.
 */
export const articleActionCreators = {
    addArticleActionCreator,
    removeArticleActionCreator,
    updateArticleActionCreator,
};
