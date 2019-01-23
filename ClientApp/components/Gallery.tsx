import * as React from "react";

type GalleryElementProps = {
    url: string;
};

type GalleryElementState = {};

export class GalleryElement extends React.Component<GalleryElementProps, GalleryElementState> {
    constructor(props: GalleryElementProps) {
        super(props);
    }

    render() {
        const style: React.CSSProperties = {
            display: "flex",
            border: "1px solid grey",
            width: "100%"
        };

        return (
            <div style={style}>
                <img src={this.props.url} className="p-3" style={{ width: "100%" }}></img>
            </div>
        )
    }
}

type GalleryProps = {
    numberOfImagePerAxis: number;
    urls: string[];
};

type GalleryState = {};

export class Gallery extends React.Component<GalleryProps, GalleryState>{
    constructor(props: GalleryProps) {
        super(props);
    }

    getAxisRatio() {
        return 100 / this.props.numberOfImagePerAxis;
    }

    getColumns() {
        const columns: string[][] = [];
        for (let i = 0; i < this.props.urls.length; i++) {
            if (columns[i % this.props.numberOfImagePerAxis] === undefined) {
                columns[i % this.props.numberOfImagePerAxis] = [this.props.urls[i]];
            } else {
                columns[i % this.props.numberOfImagePerAxis].push(this.props.urls[i]);
            }
        }
        return columns;
    }

    render() {
        return (
            <div>
                {this.getColumns().map((col, idx) => {
                    return (
                        <div style={{ width: `${this.getAxisRatio()}%`, float: "left" }} key={idx}>
                            {col.map((url, colIdx) => {
                                return (
                                    <GalleryElement
                                        url={url}
                                        key={idx * this.props.numberOfImagePerAxis + colIdx} />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}