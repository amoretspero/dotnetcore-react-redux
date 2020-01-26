import * as React from "react";
import { VisibleBookList } from "./containers/VisibleBookList";
import { BookPageMainSection } from "./BookPageMainSection";
import { BookListFilterContainer } from "./containers/BookListFilter";
import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { AppState } from "../reducers/reducer";
import { BookPageProps } from "../types/book";
import { BookPageListSection } from "./BookPageListSection";

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
                <BookPageListSection />
            </div>
        )
    }
}
