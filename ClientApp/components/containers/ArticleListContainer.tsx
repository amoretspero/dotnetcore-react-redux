import { AppState } from "../../reducers/reducer";
import { ArticleListProps } from "../../types/blog";
import { connect } from "react-redux";
import { ArticleList } from "../../components/ArticleList";

/**
 * Maps current state to container component's props.
 * @param state State to map to props of container component.
 */
function articleListMapStateToProps(state: AppState): ArticleListProps {
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

/**
 * Container component, created by connecting state, dispatch to existing component.
 * For this case, no dispatch is mapped since there is no need.
 */
export const ArticleListContainer = connect(articleListMapStateToProps)(ArticleList);
