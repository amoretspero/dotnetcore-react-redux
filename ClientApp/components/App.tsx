import * as React from "react";
import MainNavigationSection from "./MainNavigationSection";
import MainSection from "./MainSection";

class App extends React.Component {
    render() {
        return (
            <div className="section-wrapper">
                <MainSection />
                <MainNavigationSection />
            </div>
        );
    }
}

export default App;
