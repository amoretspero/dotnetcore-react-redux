import { AppState, KnownAppAction } from "../../reducers/reducer";
import { LoginBoxStateProps, LoginBoxDispatchProps, LoginBox } from "../../components/LoginBox";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

/**
 * LoginBoxContainer component props type.
 */
export type LoginBoxContainerProps = {};

/**
 * Maps current state to container component's props.
 * @param state State to map to props of container component.
 * @param ownProps Props provided when using this component.
 */
function loginBoxMapStateToProps(state: AppState, ownProps: LoginBoxContainerProps): LoginBoxStateProps {
    return {
        fetchError: state.authentication.fetchError,
        isLoggingIn: state.authentication.isLoggedIn,
    };
}

/**
 * Maps dispatches to container component's props.
 * @param dispatch Dispatch to map to props of container component.
 * @param ownProps Props provided when using this component.
 */
function loginBoxMapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, KnownAppAction>, ownProps: LoginBoxContainerProps): LoginBoxDispatchProps {
    return {
        dispatch,
    };
}

/**
 * Container component, created by connecting state, dispatch to existing component.
 */
export const LoginBoxContainer = connect<LoginBoxStateProps, LoginBoxDispatchProps, LoginBoxContainerProps, AppState>(loginBoxMapStateToProps, loginBoxMapDispatchToProps)(LoginBox);
