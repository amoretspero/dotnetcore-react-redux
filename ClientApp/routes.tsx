import * as React from "react";
import { Route, Router } from "react-router-dom";
import App from "./components/App";
import Myself from "./components/Myself";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { createStore } from "redux";
import bookListReducer from "reducers/bookList";

const browserHistory = createBrowserHistory();
const store = createStore(bookListReducer);

class Routes extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route exact path="/" component={App} />
                    <Route path="/myself" component={Myself} />
                </Router>
            </Provider>
        )
    }
}

export default Routes;