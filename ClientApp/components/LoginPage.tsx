import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { KnownAppAction, AppState } from "../reducers/reducer";
import { authenticationActionCreators } from "../actions/authentication";

import "../css/login.css";
import { LoginPageMainSection } from "./LoginPageMainSection";
import { RouteComponentProps } from "react-router";

// export type LoginPageStateProps = {
//     isLoggingIn: boolean,
//     fetchError: Error | undefined,
// }

export interface LoginPageStateProps extends RouteComponentProps { };

export type LoginPageDispatchProps = {};

export type LoginPageProps = LoginPageStateProps & LoginPageDispatchProps;

export type LoginPageState = {};

// export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    render() {
        return (
            <div>
                <LoginPageMainSection redirectTo={this.props.location.state.from || "/"} />
            </div>
        )
    }
}
