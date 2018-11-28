import * as React from "react";

export class BookPageMainSection extends React.Component {
    render() {
        return (
            <section className="bookpage-main-section text-right">
                <div className="title-middle text-center">
                    <h1 style={{ fontWeight: 700 }} className="my-5">
                        Books
                    </h1>
                    <p style={{ fontSize: "x-large" }} className="my-3">
                        지금까지 읽어왔던, 지금 읽고 있는, 그리고 앞으로 읽을 책들.
                    </p>
                    <footer style={{ fontWeight: 700 }}>
                        - 사람은 책을 만들고 책은 사람을 만든다
                    </footer>
                </div>
            </section>
        )
    }
}