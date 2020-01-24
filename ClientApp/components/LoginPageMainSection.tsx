import * as React from "react";
import { LoginBoxContainer } from "./containers/LoginBoxContainer";

export type LoginPageStateProps = {
    redirectTo: string,
}

export type LoginPageDispatchProps = {};

export type LoginPageProps = LoginPageStateProps & LoginPageDispatchProps;

export type LoginPageState = {};

export class LoginPageMainSection extends React.Component<LoginPageProps, LoginPageState> {
    render() {
        return (
            <section className="login-main-section">
                <div className="login-region">
                    <h2>
                        Sample web site - Login
                    </h2>
                    <LoginBoxContainer redirectTo={this.props.redirectTo} />
                </div>
            </section>
        )
    }
}