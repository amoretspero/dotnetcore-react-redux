import * as React from "react";
import { ArticleListProps } from "../types/blog";
import { ArticleListElement } from "./ArticleListElement";

export class ArticleList extends React.Component<ArticleListProps, {}> {
    constructor(props: ArticleListProps) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(this.props.fetchArticlesThunkActionCreator());
    }

    render() {
        return (
            <div className="ms-Grid-row px-5 px-2 m-2">
                {this.props.elements.map((elem, idx) => {
                    return <ArticleListElement
                        author={elem.author}
                        createdAt={elem.createdAt}
                        subtitle={elem.subtitle}
                        title={elem.title}
                        updatedAt={elem.updatedAt}
                        key={idx}
                    />
                })}
            </div>
        )
    }
}