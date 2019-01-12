import * as React from "react";
import { VisibleBookList } from "./containers/VisibleBookList";
import { BookPageMainSection } from "./BookPageMainSection";
import { BookListFilterContainer } from "./containers/BookListFilter";
import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { Dispatch, AnyAction } from "redux";
import { bookActionCreators } from "../actions/book";
import { KnownAppAction, AppState } from "../reducers/reducer";

type BookPageProps = {
    dispatch: Dispatch<KnownAppAction>,
} & typeof bookActionCreators;

export class BookPage extends React.Component<BookPageProps, AppState> {

    constructor(props: BookPageProps) {
        super(props);
    }

    // Triggered when this component has been successfully mounted.
    componentDidMount() {
        // May not use Dispatch from redux, when `type` property is not set at `AppThunkAction` type.
        // Since type parameter used for Dispatch of redux should contain `type`.
        // If `type` property is set at `AppThunkAction` and appropriate `type` is set like normal actions for thunk actions,
        // Dispatch from redux may be used.
        // this.props.fetchBooksThunkActionCreator(); // Version for not using Dispatch from redux.
        this.props.dispatch(this.props.fetchBooksThunkActionCreator()); // Version using Dispatch from redux.
    }

    render() {
        return (
            <div>
                <BookPageMainSection />
                <div className="text-center my-5 py-3 mx-5 px-5">
                    <BookListFilterContainer filter={BookVisibilityFilter.SHOW_ALL} text="All" />
                    <BookListFilterContainer filter={BookVisibilityFilter.WISHLIST} text="Wishlist" />
                    <BookListFilterContainer filter={BookVisibilityFilter.PENDING} text="Pending" />
                    <BookListFilterContainer filter={BookVisibilityFilter.READING} text="Reading" />
                    <BookListFilterContainer filter={BookVisibilityFilter.FINISHED} text="Finished" />
                </div>
                <VisibleBookList />
            </div>
        )
    }
}
