import { BookStatus } from "helpers/enums/bookStatus";

/**
 * Book type.
 */
export interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
}