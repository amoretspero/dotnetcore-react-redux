import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { KnownAppAction, AppState } from "reducers/reducer";
import { User } from "../types/user";
import { browserHistory } from "../routes";

export interface RequestLoginAction {
    type: "REQUEST_LOGIN";
    username: string;
    password: string;
}

export interface RequestLoginSuccessAction {
    type: "REQUEST_LOGIN_SUCCESS";
    user: User;
}

export interface RequestLoginFailureAction {
    type: "REQUEST_LOGIN_FAILURE";
    errorMessage: string;
}

export interface LogoutAction {
    type: "LOGOUT";
}

export interface RequestRegisterAction {
    type: "REQUEST_REGISTER";
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface RequestRegisterSuccessAction {
    type: "REQUEST_REGISTER_SUCCESS";
}

export interface RequestRegisterFailureAction {
    type: "REQUEST_REGISTER_FAILURE";
    errorMessage: string;
}

export type KnownUserAction =
    RequestLoginAction |
    RequestLoginSuccessAction |
    RequestLoginFailureAction |
    LogoutAction |
    RequestRegisterAction |
    RequestRegisterSuccessAction |
    RequestRegisterFailureAction

function requestLoginActionCreator(username: string, password: string): RequestLoginAction {
    return {
        type: "REQUEST_LOGIN",
        password,
        username,
    };
}

function requestLoginSuccessActionCreator(user: User): RequestLoginSuccessAction {
    return {
        type: "REQUEST_LOGIN_SUCCESS",
        user,
    };
}

function requestLoginFailureActionCreator(errorMessage: string): RequestLoginFailureAction {
    return {
        type: "REQUEST_LOGIN_FAILURE",
        errorMessage,
    };
}

function logoutActionCreator(): LogoutAction {
    return {
        type: "LOGOUT"
    };
}

function requestRegisterActionCreator(username: string, password: string, email: string, firstname: string, lastname: string): RequestRegisterAction {
    return {
        type: "REQUEST_REGISTER",
        email,
        firstname,
        lastname,
        password,
        username,
    };
}

function requestRegisterSuccessActionCreator(): RequestRegisterSuccessAction {
    return {
        type: "REQUEST_REGISTER_SUCCESS",
    };
}

function requestRegisterFailureActionCreator(errorMessage: string): RequestRegisterFailureAction {
    return {
        type: "REQUEST_REGISTER_FAILURE",
        errorMessage,
    };
}

function userConverter(user: any) {
    if (!user) {
        throw new Error(`Cannot convert undefined or null user.`);
    }
    if (!user.token) {
        throw new Error(`User without token is invalid.`);
    }
    // NOTE: Use this section to provide custom logic if needed.
    return user;
}

function loginThunkActionCreator(username: string, password: string, redirectTo: string): ThunkAction<Promise<void>, AppState, {}, KnownAppAction> {
    return function (dispatch: ThunkDispatch<AppState, {}, KnownAppAction>, getState: () => AppState) {
        dispatch(requestLoginActionCreator(username, password)); // TODO: Should username and password be provided?
        return fetch(`users/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Username: username,
                Password: password,
            }),
        }).then((resp) => {
            console.log(resp);
            if (resp.status === 200 && resp.ok === true) {
                // When status code is 200 and OK indicates true, process response.
                return resp.json()
                    .then((val) => {
                        // Do user object conversion.
                        return userConverter(val);
                    }, (err) => {
                        // Do whatever needed to be done to error returned.
                        console.error(`An error occured.`, err);
                        throw err;
                    })
                    .then((jsonResult) => {
                        // Sets local storage with user information.
                        localStorage.setItem("user", JSON.stringify(jsonResult));
                        dispatch(requestLoginSuccessActionCreator(jsonResult));
                        browserHistory.push(redirectTo);
                    }, (err) => {
                        // Dispatches login failure action.
                        dispatch(requestLoginFailureActionCreator(err)); // TODO: Can this error be used directly?
                    });
            } else {
                // When not successful, dispatches login failure action with server-side error message.
                return resp.text()
                    .then((responseText) => {
                        dispatch(requestLoginFailureActionCreator(responseText));
                    });
            }
        });
    }
}

function registerThunkActionCreator(username: string, email: string, password: string, firstname: string, lastname: string): ThunkAction<Promise<void>, AppState, {}, KnownAppAction> {
    return function (dispatch: ThunkDispatch<AppState, {}, KnownAppAction>, getState: () => AppState) {
        dispatch(requestRegisterActionCreator(username, password, email, firstname, lastname)); // TODO: Should these information be provied?
        return fetch(`users/register`, {
            method: "POST",
            body: JSON.stringify({
                Username: username,
                Email: email,
                FirstName: firstname,
                LastName: lastname,
                Password: password,
            }),
        }).then((resp) => {
            dispatch(requestRegisterSuccessActionCreator());
        }, (err) => {
            console.error(`An error occured.`, err);
            dispatch(requestRegisterFailureActionCreator(err)); // TODO: Can this error be used directly?
        });
    }
}

export const authenticationActionCreators = {
    requestLoginActionCreator,
    requestLoginFailureActionCreator,
    requestLoginSuccessActionCreator,
    logoutActionCreator,
    requestRegisterActionCreator,
    requestRegisterFailureActionCreator,
    requestRegisterSuccessActionCreator,
    loginThunkActionCreator,
    registerThunkActionCreator,
};
