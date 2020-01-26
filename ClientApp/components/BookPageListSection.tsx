import * as React from "react";
import { BookListFilterContainer } from "./containers/BookListFilter";
import { VisibleBookList } from "./containers/VisibleBookList";
import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";

export type BookPageListSectionProps = {}

export type BookPageListSectionState = {}

export class BookPageListSection extends React.Component<BookPageListSectionProps, BookPageListSectionState> {
    constructor(props: BookPageListSectionProps) {
        super(props);
    }

    render() {
        return (
            <div className="bookpage-list-section height-4-4vh">
                <div className="text-center my-5 py-3 mx-5 px-5">
                    <BookListFilterContainer filter={BookVisibilityFilter.SHOW_ALL} text="All" />
                    <BookListFilterContainer filter={BookVisibilityFilter.WISHLIST} text="Wishlist" />
                    <BookListFilterContainer filter={BookVisibilityFilter.PENDING} text="Pending" />
                    <BookListFilterContainer filter={BookVisibilityFilter.READING} text="Reading" />
                    <BookListFilterContainer filter={BookVisibilityFilter.FINISHED} text="Finished" />
                </div>
                <VisibleBookList />
            </div>
        )
    }
}