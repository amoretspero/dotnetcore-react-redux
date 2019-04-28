import * as React from "react";
import { LoginBoxContainer } from "./containers/LoginBoxContainer";

export class LoginPageMainSection extends React.Component {
    render() {
        return (
            <section className="login-main-section">
                <div className="login-region">
                    <h2>
                        Sample web site - Login
                    </h2>
                    <LoginBoxContainer />
                </div>
            </section>
        )
    }
}