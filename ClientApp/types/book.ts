import { BookStatus } from "helpers/enums/bookStatus";

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
 * Book type.
 */
export interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
}