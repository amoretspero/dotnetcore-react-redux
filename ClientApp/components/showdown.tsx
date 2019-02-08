import * as React from "react";
import { Converter } from "showdown";
import { ShowdownProps } from "../types/showdown";
import { sanitize } from "dompurify";
import { showdownKatex } from "../helpers/showdownKatex";

import "../css/showdown.css"

export class Showdown extends React.Component<ShowdownProps, {}> {
    private _converter: Converter;
    constructor(props: ShowdownProps) {
        super(props);
        this._converter = new Converter();
        this._converter.setFlavor("github");
        this._converter.addExtension(showdownKatex({}, []), "showdown-katex");
    }

    render() {
        return (
            <div className="showdown-content"
                dangerouslySetInnerHTML={{
                    __html: sanitize(this._converter.makeHtml(this.props.markdown))
                }}></div>
        )
    }
}
