import * as React from "react";
import { VisibleBookList } from "./containers/VisibleBookList";
import { BookPageMainSection } from "./BookPageMainSection";
import { BookListFilterContainer } from "./containers/BookListFilter";
import { BookVisibilityFilters } from "../helpers/enums/BookVisibilityFilters";

export class BookPage extends React.Component {
    render() {
        return (
            <div>
                <BookPageMainSection />
                <div className="text-center my-5 py-3 mx-5 px-5">
                    <BookListFilterContainer filter={BookVisibilityFilters.SHOW_ALL} text="All" />
                    <BookListFilterContainer filter={BookVisibilityFilters.WISHLIST} text="Wishlist" />
                    <BookListFilterContainer filter={BookVisibilityFilters.PENDING} text="Pending" />
                    <BookListFilterContainer filter={BookVisibilityFilters.READING} text="Reading" />
                    <BookListFilterContainer filter={BookVisibilityFilters.FINISHED} text="Finished" />
                </div>
                <VisibleBookList />
            </div>
        )
    }
}
