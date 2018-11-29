import { BookStatus } from "../helpers/enums/bookStatus";
import { BookVisibilityFilters } from "../helpers/enums/BookVisibilityFilters";
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

export type BookListFilterProps = {
    onClick: () => void,
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