import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./components/App";
import { Fabric } from "office-ui-fabric-react/lib";

import "./css/common.css";
import "./css/main.css";
import reducer from "./reducers/reducer";
import { Provider } from "react-redux";
import Routes from "./routes";
import { initialState } from "./reducers/initialState";

/**
 * Application-wide redux store.
 */
const store = createStore(reducer, initialState);

const renderApp = () => {
    ReactDOM.render(
        <Fabric>
            <Provider store={store}>
                <Routes />
            </Provider>
        </Fabric>,
        document.getElementById("react-app")
    );
};

renderApp();
