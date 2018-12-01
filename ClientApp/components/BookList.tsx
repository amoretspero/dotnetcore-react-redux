import * as React from "react";
import { BookListProps, Book } from "../types/book";
import { BookListElement } from "./BookListElement";
import { MarqueeSelection, Selection, DetailsList, SelectionMode, DetailsListLayoutMode, IColumn } from "office-ui-fabric-react";
import { BookStatus } from "../helpers/enums/bookStatus";

export class BookList extends React.Component<BookListProps, {}> {
    private _headerColumns: IColumn[] = [
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
            minWidth: 300,
        },
        {
            key: "column3",
            name: "AUTHOR",
            fieldName: "author",
            isResizable: true,
            minWidth: 200,
            maxWidth: 200
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
    ];

    constructor(props: BookListProps) {
        super(props);
    }

    render() {
        return (
            <div className="mx-5">
                <DetailsList
                    items={this.props.books}
                    columns={this._headerColumns}
                    selectionMode={SelectionMode.none}
                >
                </DetailsList>
            </div>
        )
    };
}