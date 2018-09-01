import * as React from "react";

class MainNavigationSection extends React.Component {
    render() {
        return (
            <section className="section-full ms-Grid px-0" dir="ltr">
                <div className="ms-Grid-row height-12-12 ms-sm12 mx-0">
                    <div className="ms-Grid-col ms-sm12 ms-md6 height-6-12 d-flex align-items-center justify-content-center bg-myself">
                        <p>
                            Tile 1
                        </p>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 height-6-12 d-flex align-items-center justify-content-center bg-books">
                        <p>
                            Tile 2
                        </p>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 height-6-12 d-flex align-items-center justify-content-center bg-blog">
                        <p>
                            Tile 3
                        </p>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 height-6-12 d-flex align-items-center justify-content-center bg-education">
                        <p>
                            Tile 4
                        </p>
                    </div>
                </div>
            </section >
        )
    }
}

export default MainNavigationSection;
