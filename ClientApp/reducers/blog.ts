import { Article } from "../types/blog";
import { KnownAppAction } from "./reducer";

/**
 * Reducer for articles.
 * @param state Previous state, only containing articles.
 * @param action Action to perform on previous state.
 */
export function articlesReducer(state = [] as Article[], action: KnownAppAction) {
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