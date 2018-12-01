import * as React from "react";

export class MultiLineParagraph extends React.Component<{ text: string }, {}> {
    render() {
        return (
            <p className="multiline">
                {this.props.text}
            </p>
        )
    }
}