import * as React from "react";
import { LogoutPageMainSection } from "./LogoutPageMainSection";

import "../css/logout.css";
import { ThunkDispatch } from "redux-thunk";
import { AppState, KnownAppAction } from "../reducers/reducer";
import { authenticationActionCreators } from "../actions/authentication";
import { Redirect } from "react-router";

export type LogoutPageStateProps = {};

export type LogoutPageDispatchProps = {
    dispatch: ThunkDispatch<AppState, {}, KnownAppAction>,
};

export type LogoutPageProps = LogoutPageStateProps & LogoutPageDispatchProps;

export type LogoutPageState = {
    redirect: boolean,
};

export class LogoutPage extends React.Component<LogoutPageProps, LogoutPageState> {
    private _setTimeoutId?: number;

    constructor(props: LogoutPageProps) {
        super(props);

        // Dispatch logout action.
        this.props.dispatch(authenticationActionCreators.logoutActionCreator());

        // Set initial state.
        this.state = {
            redirect: false,
        };
    }

    componentDidMount() {
        this._setTimeoutId = setTimeout(() => this.setState({ redirect: true }), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this._setTimeoutId);
    }

    render() {
        return (
            <div>
                <LogoutPageMainSection />
                {this.state.redirect ?
                    <Redirect to="/" /> :
                    <div></div>}
            </div>
        )
    }
}