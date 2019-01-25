import * as React from "react";
import { Gallery } from "./Gallery";
import { GalleryPageMainSection } from "./GalleryPageMainSection";

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
            "https://images.unsplash.com/photo-1453323403791-7fbd02be3e40?w=1920&q=80",
            "https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=1920&q=80",
            "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1920&q=80",
            "https://images.unsplash.com/photo-1534406315430-4d7cf92bc690?w=1920&q=80",
            "https://images.unsplash.com/photo-1508669232496-137b159c1cdb?w=1920&q=80",
            "https://images.unsplash.com/photo-1529419412599-7bb870e11810?w=1920&q=80",
            "https://images.unsplash.com/photo-1517811409552-396f829138a2?w=1920&q=80",
            "https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=1920&q=80",
            "https://images.unsplash.com/photo-1445962125599-30f582ac21f4?w=1920&q=80",
            "https://images.unsplash.com/photo-1505245208761-ba872912fac0?w=1920&q=80",
            "https://images.unsplash.com/photo-1487622750296-6360190669a1?w=1920&q=80",
            "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1920&q=80",
            "https://images.unsplash.com/photo-1444465693019-aa0b6392460d?w=1920&q=80"
        ];

        return (
            <div>
                <GalleryPageMainSection />
                <div className="text-center my-5 py-3 mx-5 px-3">
                    <Gallery urls={urls} numberOfImagePerAxis={3}></Gallery>
                </div>
            </div>
        )
    }
}
