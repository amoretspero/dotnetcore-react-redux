import * as React from "react";
import { VisibleBookList } from "./containers/VisibleBookList";
import { BookPageMainSection } from "./BookPageMainSection";

export class BookPage extends React.Component {
    render() {
        return (
            <div>
                <BookPageMainSection />
                <VisibleBookList />
            </div>
        )
    }
}
