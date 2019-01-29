import { AppState, KnownAppAction } from "../../reducers/reducer";
import { ArticlePageStateProps, ArticlePageDispatchProps, ArticlePage } from "../ArticlePage";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { connect } from "react-redux";
import { match } from "react-router-dom";

/**
 * ArticlePageContainer component props type.
 */
export type ArticlePageContainerProps = {
    match: match<{ id: string }>
};

/**
 * Maps current state to container component's props.
 * @param state State to map to props of container component.
 * @param ownProps Props provided when using this component.
 */
function articlePageMapStateToProps(state: AppState, ownProps: ArticlePageContainerProps): ArticlePageStateProps {
    if (isNaN(parseInt(ownProps.match.params.id, 10))) {
        throw new Error(`Cannot parse url parameter.`);
    }
    const articleId = parseInt(ownProps.match.params.id, 10);
    return {
        fetchError: state.articles.fetchError,
        isFetching: state.articles.isFetching,
        selectedArticle: state.articles.items.find((article) => article.id === articleId),
        articleId,
    };
}

/**
 * Maps dispatches to container component's props.
 * @param dispatch Dispatch to map to props of container component.
 * @param ownProps Props provided when using this component.
 */
function articlePageMapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, KnownAppAction>, ownProps: ArticlePageContainerProps): ArticlePageDispatchProps {
    return {
        dispatch: (action: ThunkAction<Promise<void>, AppState, {}, KnownAppAction>) => { },
    };
}

/**
 * Container component, created by connecting state, dispatch to existing component.
 */
export const ArticlePageContainer = connect<ArticlePageStateProps, ArticlePageDispatchProps, ArticlePageContainerProps, AppState>(articlePageMapStateToProps, articlePageMapDispatchToProps)(ArticlePage);
