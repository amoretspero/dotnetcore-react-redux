import * as React from "react";
import { VisibleBookList } from "./containers/VisibleBookList";
import { BookPageMainSection } from "./BookPageMainSection";
import { BookListFilterContainer } from "./containers/BookListFilter";
import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";

export class BookPage extends React.Component {
    render() {
        return (
            <div>
                <BookPageMainSection />
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
