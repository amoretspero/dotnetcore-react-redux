import * as React from "react";
import { Route, Router } from "react-router-dom";
import App from "./components/App";
import { createBrowserHistory } from "history";
import { BookPage } from "./components/BookPage";
import { MyselfPage } from "./components/MyselfPage";
import { BlogPage } from "./components/BlogPage";

const browserHistory = createBrowserHistory();

class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/myself" component={MyselfPage} />
                    <Route path="/books" component={BookPage} />
                    <Route path="/blog" component={BlogPage} />
                </div>
            </Router>
        )
    }
}

export default Routes;