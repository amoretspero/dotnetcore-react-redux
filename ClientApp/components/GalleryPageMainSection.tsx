import * as React from "react";

export class GalleryPageMainSection extends React.Component {
    render() {
        return (
            <section className="gallerypage-main-section text-right">
                <div className="title-middle text-center">
                    <h1 style={{ fontWeight: 700 }} className="my-5">
                        Gallery
                    </h1>
                    <p style={{ fontSize: "x-large" }} className="my-3">
                        All your precious photos.
                    </p>
                    <footer style={{ fontWeight: 700 }}>
                        - 사진의 가장 좋은 점 중 하나는 그 안의 사람들이 변해도 사진은 변하지 않는다는 것이다.
                    </footer>
                </div>
            </section>
        )
    }
}