import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { AppState, KnownAppAction } from "reducers/reducer";
import { authenticationActionCreators } from "../actions/authentication";
import { TextField, Button, PrimaryButton } from "office-ui-fabric-react";

export type LoginBoxStateProps = {
    isLoggingIn: boolean,
    fetchError: Error | undefined,
}

export type LoginBoxDispatchProps = {
    dispatch: ThunkDispatch<AppState, {}, KnownAppAction>,
}

export type LoginBoxProps = LoginBoxStateProps & LoginBoxDispatchProps;

export type LoginBoxState = {
    usernameInput: string,
    passwordInput: string,
    isSubmitted: boolean,
}

export class LoginBox extends React.Component<LoginBoxProps, LoginBoxState> {
    constructor(props: LoginBoxProps) {
        super(props);

        // Reset login status.
        this.props.dispatch(authenticationActionCreators.logoutActionCreator());

        // Set initial state for this component.
        this.state = {
            isSubmitted: false,
            usernameInput: "",
            passwordInput: "",
        };

        // Below binding will prevent re-creating functions every time when this component is re-rendered.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        e.preventDefault();
        const currentTarget = e.target as EventTarget & (HTMLInputElement | HTMLTextAreaElement);
        // console.log(currentTarget);
        const { name, value } = currentTarget;
        // console.log(value);
        // e.currentTarget.
        // console.log(e.currentTarget);
        // this.setState({ [name]: value });
        if (name === "username") {
            this.setState({ usernameInput: value }, () => {
                // console.log(this.state); // To use updated state, callback should be used.
            });
        }
        if (name === "password") {
            this.setState({ passwordInput: value }, () => {
                // console.log(this.state);
            });
        }
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.setState({
            isSubmitted: true,
        });
        const { usernameInput, passwordInput } = this.state;
        console.log(this.state);
        if (usernameInput && passwordInput) {
            this.props.dispatch(authenticationActionCreators.loginThunkActionCreator(usernameInput, passwordInput));
        }
    }

    render() {
        return (
            <div style={{
                width: "25%",
                minWidth: "320px",
                maxWidth: "640px",
                padding: "3rem",
                backgroundColor: "white",
                textAlign: "left",
            }}>
                <p>
                    Log in to this web site.
                </p>
                {this.props.fetchError &&
                    <p style={{ color: "red" }}>
                        Error: {this.props.fetchError.message}
                    </p>
                }
                <form name="login-form" onSubmit={this.handleSubmit}>
                    <TextField label="Username" type="username" name="username" onChange={this.handleChange} />
                    <TextField label="Password" type="password" name="password" onChange={this.handleChange} />
                    <PrimaryButton type="submit" className="mt-4" style={{ alignSelf: "end" }} text="Log In" />
                </form>
            </div>
        )
    }
}
