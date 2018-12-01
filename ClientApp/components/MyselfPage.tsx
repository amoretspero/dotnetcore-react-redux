import * as React from "react";
import MyselfMainSection from "./MyselfMainSection";
import { MyselfProfileSection } from "./MyselfProfileSection";

export class MyselfPage extends React.Component {
    render() {
        return (
            <div>
                <MyselfMainSection />
                <MyselfProfileSection />
            </div>
        )
    }
}