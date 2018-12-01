import { BookStatus } from "../helpers/enums/bookStatus";
import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { SetVisibilityFilterAction } from "actions/book";

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
 * Book type.
 */
export interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
}