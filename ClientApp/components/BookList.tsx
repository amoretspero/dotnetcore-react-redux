import * as React from "react";
import { BookListProps } from "types/book";
import { BookListElement } from "./BookListElement";

export class BookList extends React.Component<BookListProps, {}> {
    constructor(props: BookListProps) {
        super(props);
    }

    render() {
        return (
            <div>
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
                        <tr>
                            <td>
                                hello
                            </td>
                        </tr>
                        {this.props.books.map((book) => {
                            <BookListElement key={book.id} book={book} />
                        })}
                    </tbody>
                </table>
            </div>
        )
    };
}