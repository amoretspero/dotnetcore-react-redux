import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { BookStatus } from "../helpers/enums/bookStatus";

/**
 * ADD_BOOK action.
 */
export interface AddBookAction {
    /**
     * Type of action.
     */
    type: "ADD_BOOK";
    /**
     * Id of book to add.
     */
    id: string;
    /**
     * Title of book to add.
     */
    title: string;
    /**
     * Author of book to add.
     */
    author: string;
    /**
     * Status of book to add.
     */
    status: BookStatus;
}

/**
 * CHANGE_BOOK_STATE action.
 */
export interface ChangeBookStatusAction {
    /**
     * Type of action.
     */
    type: "CHANGE_BOOK_STATE";
    /**
     * Id of book to change state.
     */
    id: string;
    /**
     * Target state.
     */
    status: BookStatus;
}

/**
 * REMOVE_BOOK action.
 */
export interface RemoveBookAction {
    /**
     * Type of action.
     */
    type: "REMOVE_BOOK";
    /**
     * Id of book to remove.
     */
    id: string;
}

/**
 * UPDATE_BOOK action.
 */
export interface UpdateBookAction {
    /**
     * Type of action.
     */
    type: "UPDATE_BOOK";
    /**
     * Id of book to update information.
     */
    id: string;
    /**
     * Target title, if updating.
     */
    title?: string;
    /**
     * Target author, if updating.
     */
    author?: string;
}

/**
 * SET_VISIBILITY_FILTER action.
 */
export interface SetVisibilityFilterAction {
    /**
     * Type of action.
     */
    type: "SET_VISIBILITY_FILTER";
    /**
     * Target visibility filter state.
     */
    visibilityFilter: BookVisibilityFilter;
}

export type KnownBookAction =
    AddBookAction |
    ChangeBookStatusAction |
    RemoveBookAction |
    UpdateBookAction |
    SetVisibilityFilterAction

function addBookActionCreator(id: string, title: string, author: string): AddBookAction {
    return {
        type: "ADD_BOOK",
        id,
        title,
        author,
        status: BookStatus.PENDING,
    };
}

function changeBookActionCreator(id: string, newStatus: BookStatus): ChangeBookStatusAction {
    return {
        type: "CHANGE_BOOK_STATE",
        id,
        status: newStatus,
    };
}

function removeBookActionCreator(id: string): RemoveBookAction {
    return {
        type: "REMOVE_BOOK",
        id,
    };
}

function updateBookActionCreator(id: string, title?: string, author?: string): UpdateBookAction {
    return {
        type: "UPDATE_BOOK",
        id,
        title,
        author,
    };
}

function setVisibilityFilterActionCreator(filter: BookVisibilityFilter): SetVisibilityFilterAction {
    return {
        type: "SET_VISIBILITY_FILTER",
        visibilityFilter: filter,
    };
}

export const bookActionCreators = {
    addBookActionCreator,
    changeBookActionCreator,
    removeBookActionCreator,
    updateBookActionCreator,
    setVisibilityFilterActionCreator,
};
