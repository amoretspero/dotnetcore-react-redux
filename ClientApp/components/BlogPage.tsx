import * as React from "react";
import { BlogPageMainSection } from "./BlogPageMainSection";
import { ArticleListContainer } from "./containers/ArticleListContainer";
import { Showdown } from "./showdown";


export class BlogPage extends React.Component {
    render() {
        return (
            <div>
                <BlogPageMainSection />
                <ArticleListContainer />
            </div>
        )
    }
}
