import { VisibilityFilters } from "helpers/enums/VisibilityFilters";
import { BookStatus } from "helpers/enums/bookStatus";

export interface AddBookAction {
    type: "ADD_BOOK";
    id: string;
    title: string;
    author: string;
    status: BookStatus;
}

export interface ChangeBookStatusAction {
    type: "CHANGE_BOOK_STATE";
    id: string;
    status: BookStatus;
}

export interface RemoveBookAction {
    type: "REMOVE_BOOK";
    id: string;
}

export interface UpdateBookAction {
    type: "UPDATE_BOOK";
    id: string;
    title?: string;
    author?: string;
}

export interface SetVisibilityFilterAction {
    type: "SET_VISIBILITY_FILTER";
    visibilityFilter: VisibilityFilters;
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

export const bookActionCreators = {
    addBookActionCreator,
    changeBookActionCreator,
    removeBookActionCreator,
    updateBookActionCreator,
};
