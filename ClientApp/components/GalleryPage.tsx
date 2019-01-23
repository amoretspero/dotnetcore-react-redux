import * as React from "react";
import { Gallery } from "./Gallery";

export class GalleryPage extends React.Component {
    render() {
        const urls = [
            "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1920&q=80",
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&q=80",
            "https://images.unsplash.com/photo-1540206395-68808572332f?w=1920&q=80",
            "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=1920&q=80",
            "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&q=80",
            "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=1920&q=80",
            "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=1920&q=80",
        ];

        return (
            <div className="ms-Grid-row p-3">
                <Gallery urls={urls} numberOfImagePerAxis={3}></Gallery>
            </div>
        )
    }
}
