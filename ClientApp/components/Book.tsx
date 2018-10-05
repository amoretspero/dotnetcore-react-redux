import * as React from "react";

class BookPageMainSection extends React.Component {
    render() {
        return (
            <section className="main-section text-right">
                <div className="title-middle text-center">
                    <h1>
                        Books
                    </h1>
                    <p>
                        Books to read in future, reading right now and already read.
                    </p>
                </div>
            </section>
        )
    }
}

class BookPage extends React.Component {
    render() {
        return (
            <div>
                <BookPageMainSection />
            </div>
        )
    }
}