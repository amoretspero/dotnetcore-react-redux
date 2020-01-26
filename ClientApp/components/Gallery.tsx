import * as React from "react";
import { Modal } from "office-ui-fabric-react";

type GalleryElementProps = {
    url: string;
    key: number;
};

type GalleryElementState = {
    showModal: boolean;
};

export class GalleryElement extends React.Component<GalleryElementProps, GalleryElementState> {
    constructor(props: GalleryElementProps) {
        super(props);
        this.state = { showModal: false };
    }

    render() {
        const style: React.CSSProperties = {
            display: "flex",
            // border: "1px solid grey",
            width: "100%"
        };

        return (
            <div style={style}>
                <img
                    id={`gallery-image-${this.props.key}`}
                    src={this.props.url}
                    className="p-2"
                    style={{ width: "100%" }}
                    onClick={this.showModal} />
                <Modal
                    titleAriaId={`gallery-image-${this.props.key}-title`}
                    subtitleAriaId={`gallery-image-${this.props.key}-subtitle`}
                    isOpen={this.state.showModal}
                    onDismiss={this.closeModal}
                    isBlocking={false}
                    className="px-4"
                >
                    <div className="gallery-image-modal px-5" style={{ height: "80vh" }}>
                        <h2 style={{ height: "2.5rem" }}>Image title</h2>
                        <p style={{ height: "1.5rem" }}><span style={{ fontWeight: "bold" }}>Author: </span>The author</p>
                        <div className="gallery-image-model-big-image" style={{ height: "calc(80vh - 5.5rem)" }}>
                            <img src={this.props.url} className="p-2" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    private showModal = () => {
        this.setState({ showModal: true });
    }

    private closeModal = () => {
        this.setState({ showModal: false });
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