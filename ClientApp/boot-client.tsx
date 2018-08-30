import * as React from "react";
import * as ReactDOM from "react-dom";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
import App from "./components/App";
import { Fabric } from "office-ui-fabric-react/lib";

import "./css/MainSection.css";

// const store = createStore(rootReducer);

const renderApp = () => {
    ReactDOM.render(
        <Fabric>
            <App />
        </Fabric>,
        document.getElementById("react-app")
    );
};

renderApp();
