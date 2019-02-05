import { BookPageStateProps, BookPageContainerProps, BookPageDispatchProps } from "../../types/book";
import { AppState, KnownAppAction } from "../../reducers/reducer";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { bookActionCreators } from "../../actions/book";
import { connect } from "react-redux";
import { BookPage } from "../../components/BookPage";

function bookPageMapStateToProps(state: AppState): BookPageStateProps {
    return {};
}

function bookPageMapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, KnownAppAction>, ownProps: BookPageContainerProps): BookPageDispatchProps {
    return {
        onConstruction: () => {
            dispatch(bookActionCreators.fetchBooksThunkActionCreator);
        },
        dispatch,
        ...bookActionCreators,
    }
}

export const BookPageContainer = connect<BookPageStateProps, BookPageDispatchProps, BookPageContainerProps, AppState>(bookPageMapStateToProps, bookPageMapDispatchToProps)(BookPage);
