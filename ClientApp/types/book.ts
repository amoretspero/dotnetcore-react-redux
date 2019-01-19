import { BookStatus } from "../helpers/enums/bookStatus";
import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { SetVisibilityFilterAction, bookActionCreators } from "actions/book";
import { Dispatch } from "redux";
import { KnownAppAction, AppState } from "reducers/reducer";
import { ThunkDispatch } from "redux-thunk";

/**
 * BookList component props type.
 */
export type BookListProps = {
    books: Book[];
}

/**
 * BookListElement component props type.
 */
export type BookListElementProps = {
    book: Book;
}

/**
 * BookListFilter component props type.
 */
export type BookListFilterProps = {
    /**
     * onClick event to fire when clicked.
     */
    onClick: () => void,
    /**
     * Text to render inside button.
     */
    text: string,
    /**
     * Current state's filter.
     */
    currentFilter: BookVisibilityFilter,
    /**
     * Current component's filter.
     */
    ownFilter: BookVisibilityFilter,
}

/**
 * BookListFilterContainer component props type.
 */
export type BookListFilterContainerProps = {
    /**
     * Filter to assign to component.
     */
    filter: BookVisibilityFilter,
    /**
     * Text to render for button.
     */
    text: string,
}

/**
 * BookPage props type for state related props.
 */
export type BookPageStateProps = {}

/**
 * BookPage props type for dispatch related props.
 */
export type BookPageDispatchProps = {
    /**
     * Thunk dispatching function to call in constructor.
     */
    onConstruction: () => void,

    /**
     * Dispatch for actions.
     */
    dispatch: ThunkDispatch<AppState, {}, KnownAppAction>,
} & typeof bookActionCreators;

/**
 * BookPage component props type.
 */
export type BookPageProps = BookPageStateProps & BookPageDispatchProps

/**
 * BookPageContainer component props type.
 */
export type BookPageContainerProps = {}

/**
 * Book type.
 */
export interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
}