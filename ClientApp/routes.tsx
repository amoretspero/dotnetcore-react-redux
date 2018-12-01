import * as React from "react";
import { Route, Router } from "react-router-dom";
import App from "./components/App";
import { createBrowserHistory } from "history";
import { BookPage } from "./components/BookPage";
import { MyselfPage } from "./components/MyselfPage";

const browserHistory = createBrowserHistory();

class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/myself" component={MyselfPage} />
                    <Route path="/book" component={BookPage} />
                </div>
            </Router>
        )
    }
}

export default Routes;