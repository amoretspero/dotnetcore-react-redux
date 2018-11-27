import * as React from "react";
import { BookListElementProps } from "types/book";

export class BookListElement extends React.Component<BookListElementProps, {}> {
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