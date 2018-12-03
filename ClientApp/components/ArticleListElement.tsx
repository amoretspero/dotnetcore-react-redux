import * as React from "react";
import { ArticleListElementProps } from "../types/blog";
import { DateTime } from "luxon";

export class ArticleListElement extends React.Component<ArticleListElementProps, {}> {
    constructor(props: ArticleListElementProps) {
        super(props);
    }

    render() {
        return (
            <div className="ms-sm12 text-left p-2 my-2">
                <h2>
                    {this.props.title}
                </h2>
                {this.getSubtitleElement(this.props.subtitle)}
                <p>
                    <span className="my-2 mr-2">
                        First written: {DateTime.fromJSDate(this.props.createdAt).toFormat("yyyy-LL-dd HH:mm:ss ZZZZ")}
                    </span>
                    <span>
                        Last modified: {DateTime.fromJSDate(this.props.updatedAt).toFormat("yyyy-LL-dd HH:mm:ss ZZZZ")}
                    </span>
                    <span>
                        Author: {this.props.author}
                    </span>
                </p>
            </div>
        )
    }

    private getSubtitleElement(subtitle?: string) {
        if (subtitle === undefined) {
            return null;
        } else {
            return (
                <h3>
                    {subtitle}
                </h3>
            )
        }
    }
}