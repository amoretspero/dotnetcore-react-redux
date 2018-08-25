import * as React from "react";
import * as ReactDOM from "react-dom";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
import App from "./components/App";

// const store = createStore(rootReducer);

const renderApp = () => {
    ReactDOM.render(
        <App>
            <h1>
                Hello, world!
            </h1>
        </App>,
        document.getElementById("react-app")
    );
};

renderApp();
