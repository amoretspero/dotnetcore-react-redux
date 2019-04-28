import * as React from "react";
import { Route, Router, RouteProps, Redirect } from "react-router-dom";
import App from "./components/App";
import { createBrowserHistory } from "history";
import { MyselfPage } from "./components/MyselfPage";
import { BlogPage } from "./components/BlogPage";
import { BookPageContainer } from "./components/containers/BookPageContainer";
import { GalleryPage } from "./components/GalleryPage";
import { ArticlePageContainer } from "./components/containers/ArticlePageContainer";
import { LoginPage } from "./components/LoginPage";

const browserHistory = createBrowserHistory();

/**
 * This class takes charge of private routing.
 * 
 * By using this, user will be redirected to login page on accessing given url when not logged in.
 */
class PrivateRoute extends React.Component<RouteProps, {}> {
    render() {
        const { component, ...rest } = this.props;
        const Component = component!;
        return (
            <Route {...rest} render={(props) => {
                return localStorage.getItem("user") ?
                    <Component {...props} /> :
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }} />
        )
    }
}

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
                    <PrivateRoute path="/gallery" component={GalleryPage} />
                    <Route path="/login" component={LoginPage} />
                </div>
            </Router>
        )
    }
}

export {
    Routes,
    browserHistory,
}
