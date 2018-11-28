import * as React from "react";
import { BookListProps, Book } from "../types/book";
import { BookListElement } from "./BookListElement";
import { MarqueeSelection, Selection, DetailsList, SelectionMode } from "office-ui-fabric-react";
import { BookStatus } from "../helpers/enums/bookStatus";

export class BookList extends React.Component<BookListProps, {}> {

    constructor(props: BookListProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <DetailsList
                    items={this.props.books}
                    columns={[
                        {
                            key: "column1",
                            name: "ID",
                            fieldName: "id",
                            isRowHeader: true,
                            isResizable: true,
                            minWidth: 50,
                            maxWidth: 100
                        },
                        {
                            key: "column2",
                            name: "TITLE",
                            fieldName: "title",
                            isResizable: true,
                            minWidth: 400,
                        },
                        {
                            key: "column3",
                            name: "AUTHOR",
                            fieldName: "author",
                            isResizable: true,
                            minWidth: 200,
                        },
                        {
                            key: "column4",
                            name: "STATUS",
                            // fieldName: "status",
                            isResizable: true,
                            minWidth: 200,
                            onRender: (item: Book) => {
                                switch (item.status) {
                                    case BookStatus.WISHLIST:
                                        return "읽고 싶은 책";
                                    case BookStatus.PENDING:
                                        return "곧 읽을 예정인 책";
                                    case BookStatus.READING:
                                        return "지금 읽고 있는 책";
                                    case BookStatus.FINISHED:
                                        return "다 읽은 책";
                                    default:
                                        return "N/A";
                                }
                            }
                        }
                    ]}
                    selectionMode={SelectionMode.none}>

                </DetailsList>
            </div>
        )
    };
}