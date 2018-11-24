import * as React from "react";
import { Book } from "../types/book";
import { connect } from "react-redux";
import { VisibleBookList } from "./containers/VisibleBookList";

class BookPageMainSection extends React.Component {
    render() {
        return (
            <section className="main-section text-right">
                <div className="title-middle text-center">
                    <h1>
                        Books
                    </h1>
                    <p>
                        Books to read in future, reading right now and already read.
                    </p>
                </div>
            </section>
        )
    }
}

export type BookListProps = {
    books: Book[];
}

type BookListElementProps = {
    book: Book;
}

class BookListElement extends React.Component<BookListElementProps, {}> {
    constructor(props: BookListElementProps) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.book.id}
                </td>
                <td>
                    {this.props.book.title}
                </td>
                <td>
                    {this.props.book.author}
                </td>
                <td>
                    {this.props.book.status}
                </td>
            </tr>
        )
    }
}

export class BookList extends React.Component<BookListProps, {}> {
    constructor(props: BookListProps) {
        super(props);
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.books.map((book) => {
                        <BookListElement key={book.id} book={book} />
                    })}
                </tbody>
            </table>
        )
    };
}

class BookPage extends React.Component {
    render() {
        return (
            <div>
                <BookPageMainSection />
                <VisibleBookList />
            </div>
        )
    }
}
