import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { BookStatus } from "../helpers/enums/bookStatus";
import { Book } from "../types/book";
import { Dispatch } from "redux";

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
 * REQUEST_BOOKS action.
 */
export interface RequestBooksAction {
    /**
     * Type of action.
     */
    type: "REQUEST_BOOKS";
}

/**
 * RECEIVE_BOOKS action.
 */
export interface ReceiveBooksAction {
    /**
     * Type of action.
     */
    type: "RECEIVE_BOOKS";

    /**
     * Books received from network request.
     */
    items: Book[];
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

/**
 * Known book actions.
 */
export type KnownBookAction =
    AddBookAction |
    ChangeBookStatusAction |
    RemoveBookAction |
    UpdateBookAction |
    RequestBooksAction |
    ReceiveBooksAction |
    SetVisibilityFilterAction

/**
 * Action creator for ADD_BOOK action.
 * @param id Id of book to add.
 * @param title Title of book.
 * @param author Author of book.
 */
function addBookActionCreator(id: string, title: string, author: string): AddBookAction {
    return {
        type: "ADD_BOOK",
        id,
        title,
        author,
        status: BookStatus.PENDING,
    };
}

/**
 * Action creator for CHANGE_BOOK_STATE action.
 * @param id Id of book to change status.
 * @param newStatus New status of book.
 */
function changeBookStatusActionCreator(id: string, newStatus: BookStatus): ChangeBookStatusAction {
    return {
        type: "CHANGE_BOOK_STATE",
        id,
        status: newStatus,
    };
}

/**
 * Action creator for REMOVE_BOOK action.
 * @param id Id of book to remove.
 */
function removeBookActionCreator(id: string): RemoveBookAction {
    return {
        type: "REMOVE_BOOK",
        id,
    };
}

/**
 * Action creator for UPDATE_BOOK action.
 * @param id Id of book to update information.
 * @param title New title of book.
 * @param author New author of book.
 */
function updateBookActionCreator(id: string, title?: string, author?: string): UpdateBookAction {
    return {
        type: "UPDATE_BOOK",
        id,
        title,
        author,
    };
}

/**
 * Action creator for SET_VISIBILITY_FILTER action.
 * @param filter New filter to set.
 */
function setVisibilityFilterActionCreator(filter: BookVisibilityFilter): SetVisibilityFilterAction {
    return {
        type: "SET_VISIBILITY_FILTER",
        visibilityFilter: filter,
    };
}

/**
 * Action creator for REQUEST_BOOKS action.
 */
function requestBooksActionCreator(): RequestBooksAction {
    return {
        type: "REQUEST_BOOKS",
    };
}

/**
 * Action creator for RECEIVE_BOOKS action.
 * @param items Books received from network request.
 */
function receiveBooksActionCreator(items: Book[]): ReceiveBooksAction {
    return {
        type: "RECEIVE_BOOKS",
        items,
    };
}

/**
 * Thunk action creator responsible for fetching books from server.
 */
function fetchBooksThunkActionCreator() {
    return function (dispatch: Dispatch) {
        // When current state is needed, this function can take `getState` argument as well.
        dispatch(requestBooksActionCreator());
        return fetch(`api/books`)
            .then((resp) => {
                return resp.json(); // TODO: Must resolve type difference between server Book type and client Book type.
            }, (err) => {
                console.error(`An error occured.`, err);
            })
            .then((jsonResult) => {
                dispatch(receiveBooksActionCreator(jsonResult));
            });
    }
}

/**
 * Collection of book action creators.
 */
export const bookActionCreators = {
    addBookActionCreator,
    changeBookStatusActionCreator,
    removeBookActionCreator,
    updateBookActionCreator,
    setVisibilityFilterActionCreator,
    fetchBooksThunkActionCreator,
};
