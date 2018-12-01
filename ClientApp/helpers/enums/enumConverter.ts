import { BookStatus } from "./bookStatus";
import { BookVisibilityFilter } from "./BookVisibilityFilters";

/**
 * Converts `BookStatus` enum to string.
 * @param bookStatus `BookStatus` to convert to string.
 */
export function bookStatusToString(bookStatus: BookStatus) {
    switch (bookStatus) {
        case BookStatus.WISHLIST:
            return "WISHLIST";
        case BookStatus.PENDING:
            return "PENDING";
        case BookStatus.READING:
            return "READING";
        case BookStatus.FINISHED:
            return "FINISHED";
        default:
            throw new Error(`Cannot convert BookStatus ${bookStatus} to string.`);
    }
}

export function stringToBookStatus(str: string) {
    switch (str) {
        case "WISHLIST":
            return BookStatus.WISHLIST;
        case "PENDING":
            return BookStatus.PENDING;
        case "READING":
            return BookStatus.READING;
        case "FINISHED":
            return BookStatus.FINISHED;
        default:
            throw new Error(`Cannot convert string ${str} to BookStatus.`);
    }
}

export function bookVisibilityFilterToString(filter: BookVisibilityFilter) {
    switch (filter) {
        case BookVisibilityFilter.SHOW_ALL:
            return "SHOW_ALL";
        case BookVisibilityFilter.PENDING:
            return "PENDING";
        case BookVisibilityFilter.READING:
            return "READING";
        case BookVisibilityFilter.FINISHED:
            return "FINISHED";
        case BookVisibilityFilter.WISHLIST:
            return "WISHLIST";
        default:
            throw new Error(`Cannot convert BookVisibilityFilter ${filter} to string.`);
    }
}

export function stringToBookVisibilityFilter(str: string) {
    switch (str) {
        case "SHOW_ALL":
            return BookVisibilityFilter.SHOW_ALL;
        case "PENDING":
            return BookVisibilityFilter.PENDING;
        case "READING":
            return BookVisibilityFilter.READING;
        case "FINISHED":
            return BookVisibilityFilter.FINISHED;
        case "WISHLIST":
            return BookVisibilityFilter.WISHLIST;
        default:
            throw new Error(`Cannot convert string ${str} to BookVisibilityFilter.`);
    }
}