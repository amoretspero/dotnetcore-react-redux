import * as React from "react";
import { Article } from "types/blog";
import { AppState, KnownAppAction } from "../reducers/reducer";
import { ThunkDispatch } from "redux-thunk";
import { blogActionCreators } from "../actions/blog";
import { DateTime } from "luxon";
import { Showdown } from "./Showdown";

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
            <h1 className="article-title py-3 my-3">
                {this.props.title}
            </h1>
        )
    }
}

/**
 * ArticleSubtitle component props type.
 */
export type ArticleSubtitleProps = {
    /**
     * Subtitle of article.
     */
    subtitle: string;
}

/**
 * ArticleSubtitle component state type.
 */
export type ArticleSubtitleState = {}

export class ArticleSubtitle extends React.Component<ArticleSubtitleProps, ArticleSubtitleState> {
    constructor(props: ArticleSubtitleProps) {
        super(props);
    }

    render() {
        return (
            <h3 className="article-subtitle py-2 my-2">
                {this.props.subtitle}
            </h3>
        )
    }
}

/**
 * ArticleInformation component props type.
 */
export type ArticleInformationProps = {
    /**
     * Author of article.
     */
    author: string;

    /**
     * The time when this article is first created.
     */
    createdAt: Date;

    /**
     * The time when this article is lastly updated.
     */
    updatedAt: Date;
}

/**
 * ArticleInformation component state type.
 */
export type ArticleInformationState = {}

export class ArticleInformation extends React.Component<ArticleInformationProps, ArticleInformationState> {
    constructor(props: ArticleInformationProps) {
        super(props);
    }

    render() {
        return (
            <div className="article-information my-2 py-2">
                <div className="article-information-author-region mx-2 my-1">
                    <span className="article-information-author-caption mx-2">
                        Written by:
                    </span>
                    <span className="article-information-author-content">
                        {this.props.author}
                    </span>
                </div>
                <div className="article-information-date-region mx-2 my-1">
                    <span className="article-information-createdat-caption mx-2">
                        First written:
                    </span>
                    <span className="article-information-createdat-content mx-2">
                        {DateTime.fromJSDate(this.props.createdAt).toFormat("yyyy/MM/dd HH:mm:ss ZZZZ")}
                        {/* {DateTime.fromJSDate(this.props.createdAt).toFormat("ffff")} */}
                    </span>
                    <span className="vertical-separator"></span>
                    <span className="article-information-updatedat-caption mx-2">
                        Last updated:
                    </span>
                    <span className="article-information-updatedat-content mx-2">
                        {DateTime.fromJSDate(this.props.updatedAt).toFormat("yyyy/MM/dd HH:mm:ss ZZZZ")}
                    </span>
                </div>
            </div>
        )
    }
}

/**
 * ArticleContent component props type.
 */
export type ArticleContentProps = {
    /**
     * Content of article.
     */
    content: string;
}

/**
 * ArticleContent component state type.
 */
export type ArticleContentState = {};

export class ArticleContent extends React.Component<ArticleContentProps, ArticleContentState> {
    constructor(props: ArticleContentProps) {
        super(props);
    }

    render() {
        return (
            <div className="article-content-region mx-2 px-2">
                <Showdown markdown={this.props.content} />
            </div>
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

    componentDidMount() {
        console.log(this.props.article);
    }

    render() {
        return (
            <div className="article-element">
                <ArticleTitle title={this.props.article.title} />
                <ArticleSubtitle subtitle={this.props.article.subtitle} />
                <ArticleInformation
                    author={this.props.article.author}
                    createdAt={this.props.article.createdAt}
                    updatedAt={this.props.article.updatedAt} />
                <div className="horizontal-separator"></div>
                <ArticleContent content={this.props.article.content} />
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
        this.props.dispatch(blogActionCreators.selectArticleActionCreator(this.props.articleId));
        this.props.dispatch(blogActionCreators.fetchArticleThunkActionCreator(this.props.articleId));
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
