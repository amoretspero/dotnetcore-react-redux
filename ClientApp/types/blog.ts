import { ThunkDispatch } from "redux-thunk";

import { AppState, KnownAppAction } from "../reducers/reducer";
import { blogActionCreators } from "actions/blog";

/**
 * Article list element's props type.
 */
export type ArticleListElementProps = {
    title: string,
    subtitle: string,
    createdAt: Date,
    updatedAt: Date,
    author: string,
}

export type ArticleListStateProps = {
    elements: ArticleListElementProps[],
}

export type ArticleListDispatchProps = {
    dispatch: ThunkDispatch<AppState, {}, KnownAppAction>,
} & typeof blogActionCreators;

/**
 * Article list's props type.
 */
export type ArticleListProps = ArticleListStateProps & ArticleListDispatchProps

export interface Article {
    id: number;
    title: string,
    subtitle: string,
    createdAt: Date,
    updatedAt: Date,
    author: string,
    content: string,
}