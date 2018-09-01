import * as React from "react";

class MainNavigationSection extends React.Component {
    render() {
        return (
            <section className="section-full ms-Grid px-0" dir="ltr">
                <div className="ms-Grid-row height-12-12 ms-sm12 mx-0">
                    <div className="ms-Grid-col ms-sm12 ms-md6 height-6-12 d-flex align-items-center flex-wrap align-content-center justify-content-center text-center bg-myself">
                        <h2 className="section-navigation-title ms-sm12 ">
                            Sample title
                        </h2>
                        <p className="section-navigation-desc ms-sm12">
                            Some brief description about content.
                            This is second line of description.
                        </p>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 height-6-12 d-flex align-items-center flex-wrap align-content-center justify-content-center text-center bg-books">
                        <h2 className="section-navigation-title ms-sm12 ">
                            Sample title
                        </h2>
                        <p className="section-navigation-desc ms-sm12">
                            Some brief description about content.
                            This is second line of description.
                        </p>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 height-6-12 d-flex align-items-center flex-wrap align-content-center justify-content-center bg-blog text-center">
                        <h2 className="section-navigation-title ms-sm12 ">
                            Sample title
                        </h2>
                        <p className="section-navigation-desc ms-sm12">
                            Some brief description about content.
                            This is second line of description.
                        </p>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 height-6-12 d-flex align-items-center flex-wrap align-content-center justify-content-center bg-education text-center">
                        <h2 className="section-navigation-title ms-sm12 ">
                            Sample title
                        </h2>
                        <p className="section-navigation-desc ms-sm12">
                            Some brief description about content.
                            This is second line of description.
                        </p>
                    </div>
                </div>
            </section >
        )
    }
}

export default MainNavigationSection;
