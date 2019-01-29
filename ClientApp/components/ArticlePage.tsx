import * as React from "react";
import { Article } from "types/blog";
import { AppState, KnownAppAction } from "../reducers/reducer";
import { ThunkDispatch } from "redux-thunk";
import { articleActionCreators } from "../actions/blog";

import "../css/article.css";

/**
 * ArticleTitle component props type.
 */
export type ArticleTitleProps = {
    /**
     * Title of article.
     */
    title: string;
};

/**
 * ArticleTitle component state type.
 */
export type ArticleTitleState = {};

export class ArticleTitle extends React.Component<ArticleTitleProps, ArticleTitleState> {
    constructor(props: ArticleTitleProps) {
        super(props);
    }

    render() {
        return (
            <h1 className="article-title py-2 my-2">
                {this.props.title}
            </h1>
        )
    }
}

/**
 * ArticleElement component props type.
 */
export type ArticleElementProps = {
    /**
     * Article to render.
     */
    article: Article;
};

/**
 * ArticleElement component state type.
 */
export type ArticleElementState = {};


export class ArticleElement extends React.Component<ArticleElementProps, ArticleElementState> {
    constructor(props: ArticleElementProps) {
        super(props);
    }

    render() {
        return (
            <div className="article-element">
                <ArticleTitle title={this.props.article.title} />
            </div>
        )
    }
}

/**
 * ArticlePage component props type for state related props.
 */
export type ArticlePageStateProps = {
    /**
     * Whether fetching for selected article resulted in error.
     */
    fetchError: Error | undefined,

    /**
     * Whether selected article is being fetched.
     */
    isFetching: boolean,

    /**
     * Selected article for current ArticlePage.
     */
    selectedArticle: Article | undefined,

    /**
     * Article id of current ArticlePage.
     */
    articleId: number,
};

/**
 * ArticlePage component props type for dispatch related props.
 */
export type ArticlePageDispatchProps = {
    dispatch: ThunkDispatch<AppState, {}, KnownAppAction>,
}

/**
 * ArticlePage component props type.
 */
export type ArticlePageProps = ArticlePageStateProps & ArticlePageDispatchProps;

/**
 * ArticlePage component state type.
 */
export type ArticlePageState = {};

export class ArticlePage extends React.Component<ArticlePageProps, ArticlePageState> {
    constructor(props: ArticlePageProps) {
        super(props);
    }

    componentDidMount() {
        /**
         * Select then fetch.
         */
        this.props.dispatch(articleActionCreators.selectArticleActionCreator(this.props.articleId));
        this.props.dispatch(articleActionCreators.fetchArticleThunkActionCreator(this.props.articleId))
    }

    render() {
        let content = <div>Initializing...</div>

        if (this.props.isFetching) {
            content = <div>Now fetching article...</div>
        } else {
            if (this.props.fetchError || !this.props.selectedArticle) {
                content = <div>Hmm... Something went wrong. Try again!</div>
            } else {
                content = <ArticleElement
                    article={this.props.selectedArticle} />
            }
        }

        return (
            <section className="m-5 p-5">
                {content}
            </section>
        )
    }
}
