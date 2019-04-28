import { User } from "../types/user";
import { KnownAppAction } from "./reducer";

type AuthenticationReducerState = {
    isLoggingIn: boolean,
    isLoggedIn: boolean,
    user: User | undefined,
    fetchError: Error | undefined,
}

type RegistrationReducerState = {
    isRegistering: boolean,
    fetchError: Error | undefined,
}

export function authenticationReducer(state = { isLoggingIn: false, isLoggedIn: false, user: undefined } as AuthenticationReducerState, action: KnownAppAction) {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...state,
                isLoggingIn: true,
                fetchError: undefined,
            };
        case "REQUEST_LOGIN_FAILURE":
            return {
                isLoggingIn: false,
                isLoggedIn: false,
                user: undefined,
                fetchError: new Error(action.errorMessage),
            };
        case "REQUEST_LOGIN_SUCCESS":
            return {
                isLoggingIn: false,
                isLoggedIn: true,
                user: action.user,
                fetchError: undefined,
            };
        default:
            return state;
    }
}

export function registrationReducer(state = { isRegistering: false, fetchError: undefined } as RegistrationReducerState, action: KnownAppAction) {
    switch (action.type) {
        case "REQUEST_REGISTER":
            return {
                isRegistering: true,
                fetchError: undefined,
            };
        case "REQUEST_REGISTER_FAILURE":
            return {
                isRegistering: false,
                fetchError: new Error(action.errorMessage),
            };
        case "REQUEST_REGISTER_SUCCESS":
            return {
                isRegistering: false,
                fetchError: undefined,
            };
        default:
            return state;
    }
}
