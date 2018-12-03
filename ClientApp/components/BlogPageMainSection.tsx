import * as React from "react";

export class BlogPageMainSection extends React.Component {
    render() {
        return (
            <section className="blog-main-section">
                <div className="title-middle text-center">
                    <h1 style={{ fontWeight: 700 }} className="my-5">
                        Personal Thoughts
                    </h1>
                    <p style={{ fontSize: "x-large" }} className="my-3">
                        세상 여러가지 것들에 대한 개인적인 생각들.
                    </p>
                    <footer style={{ fontWeight: 700 }}>
                        - Sentigo, Ergo, Sum.
                    </footer>
                </div>
            </section>
        )
    }
}