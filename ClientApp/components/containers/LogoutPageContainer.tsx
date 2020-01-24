import { AppState, KnownAppAction } from "../../reducers/reducer";
import { LogoutPageStateProps, LogoutPageDispatchProps, LogoutPage } from "../LogoutPage";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

/**
 * LogoutPageContainer component props type.
 */
export type LogoutPageContainerProps = {};

function logoutPageMapStateToProps(state: AppState, ownProps: LogoutPageContainerProps): LogoutPageStateProps {
    return {};
}

function logoutPageMapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, KnownAppAction>, ownProps: LogoutPageContainerProps): LogoutPageDispatchProps {
    return {
        dispatch,
    };
}

export const LogoutPageContainer = connect<LogoutPageStateProps, LogoutPageDispatchProps, LogoutPageContainerProps, AppState>(logoutPageMapStateToProps, logoutPageMapDispatchToProps)(LogoutPage);