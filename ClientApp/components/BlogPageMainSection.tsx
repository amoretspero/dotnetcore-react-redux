import * as React from "react";

export class BlogPageMainSection extends React.Component {
    render() {
        return (
            <section className="blog-main-section text-center">
                <div className="title-middle text-center">
                    <h1 style={{ fontWeight: 700 }} className="my-5">
                        Sample title
                    </h1>
                    <p style={{ fontSize: "x-large" }} className="my-3">
                        Sample subtitle - Write your own description about this page.
                    </p>
                    <footer style={{ fontWeight: 700 }}>
                        - Write_your_own_footer.
                    </footer>
                </div>
            </section>
        )
    }
}