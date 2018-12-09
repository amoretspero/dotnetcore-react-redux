import * as React from "react";
import { Converter } from "showdown";
import { ShowdownProps } from "../types/showdown";
import { sanitize } from "dompurify";
import { showdownKatex } from "../helpers/showdownKatex";

export class Showdown extends React.Component<ShowdownProps, {}> {
    private _converter: Converter;
    constructor(props: ShowdownProps) {
        super(props);
        this._converter = new Converter();
        this._converter.addExtension(showdownKatex({}, []), "showdown-katex");
    }

    render() {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: sanitize(this._converter.makeHtml(this.props.markdown))
                }}></div>
        )
    }
}
