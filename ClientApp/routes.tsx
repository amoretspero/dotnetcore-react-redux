import * as React from "react";
import { Route, Router } from "react-router-dom";
import App from "./components/App";
import Myself from "./components/Myself";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();

class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/myself" component={Myself} />
                </div>
            </Router>
        )
    }
}

export default Routes;