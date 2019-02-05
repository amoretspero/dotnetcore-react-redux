import { AppState, KnownAppAction } from "../../reducers/reducer";
import { ArticleListProps, ArticleListStateProps, ArticleListDispatchProps } from "../../types/blog";
import { connect } from "react-redux";
import { ArticleList } from "../../components/ArticleList";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { blogActionCreators } from "../../actions/blog";

/**
 * Maps current state to container component's props.
 * @param state State to map to props of container component.
 */
function articleListMapStateToProps(state: AppState): ArticleListStateProps {
    return {
        elements: state.articles.items.map((article) => {
            return {
                title: article.title,
                subtitle: article.subtitle,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                author: article.author,
            }
        }),
    };
}

function articleListMapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, KnownAppAction>): ArticleListDispatchProps {
    return {
        dispatch,
        ...blogActionCreators,
    }
}

/**
 * Container component, created by connecting state, dispatch to existing component.
 * For this case, no dispatch is mapped since there is no need.
 */
export const ArticleListContainer = connect(articleListMapStateToProps, articleListMapDispatchToProps)(ArticleList);
