import * as React from "react";
import { Route, Router } from "react-router-dom";
import App from "./components/App";
import { createBrowserHistory } from "history";
import { MyselfPage } from "./components/MyselfPage";
import { BlogPage } from "./components/BlogPage";
import { BookPageContainer } from "./components/containers/BookPageContainer";
import { GalleryPage } from "./components/GalleryPage";
import { ArticlePageContainer } from "./components/containers/ArticlePageContainer";

const browserHistory = createBrowserHistory();

class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/myself" component={MyselfPage} />
                    <Route path="/books" component={BookPageContainer} />
                    <Route exact path="/blog" component={BlogPage} />
                    <Route path="/blog/article/:id" component={ArticlePageContainer} />
                    <Route path="/gallery" component={GalleryPage} />
                </div>
            </Router>
        )
    }
}

export default Routes;