import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { KnownAppAction, AppState } from "../reducers/reducer";
import { authenticationActionCreators } from "../actions/authentication";

import "../css/login.css";
import { LoginPageMainSection } from "./LoginPageMainSection";

// export type LoginPageStateProps = {
//     isLoggingIn: boolean,
//     fetchError: Error | undefined,
// }

// export type LoginPageDispatchProps = {
//     dispatch: ThunkDispatch<AppState, {}, KnownAppAction>,
// }

// export type LoginPageProps = LoginPageStateProps & LoginPageDispatchProps;

// export type LoginPageState = {
//     usernameInput: string,
//     passwordInput: string,
//     isSubmitted: boolean,
// };

// export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
export class LoginPage extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <LoginPageMainSection />
            </div>
        )
    }
}
