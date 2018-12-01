import * as React from "react";
import { MultiLineParagraph } from "./MultiLineParagraph";

/**
 * Profile cell props type.
 */
type ProfileCellProps = {
    /**
     * Text content to render.
     */
    text: string,
    /**
     * Title to render.
     */
    title: string
}

/**
 * Profile sub-section props type.
 */
type ProfileSubSectionProps = {
    /**
     * Contents to render with `ProfileCell` component.
     */
    contents: ProfileCellProps[],
    /**
     * Title to render.
     */
    title: string
}

class ProfileCell extends React.Component<ProfileCellProps, {}> {
    render() {
        return (
            <div className="profile-content-cell ms-sm12 py-1 my-2">
                <h3 className="my-1 py-2">
                    {this.props.title}
                </h3>
                <MultiLineParagraph text={this.props.text} />
            </div>
        )
    }
}

class ProfileSubSection extends React.Component<ProfileSubSectionProps, {}> {
    render() {
        return (
            <div className="ms-Grid-col ms-xs12 ms-sm12 ms-md6 py-2 px-5 my-2">
                <h2 className="my-1 py-2">
                    {this.props.title}
                </h2>
                {this.props.contents.map((c, idx) => {
                    return <ProfileCell key={idx} title={c.title} text={c.text} />
                })}
            </div>
        )
    }
}

export class MyselfProfileSection extends React.Component {
    private _sampleContents: ProfileSubSectionProps[] = [
        {
            title: "Sub-section title 1",
            contents: [
                {
                    title: "Cell title 1",
                    text: `Cell content 1\nCell content 2`
                },
                {
                    title: "Cell title 2",
                    text: `Cell content 1\nCell content 2\nCell content 3`
                }
            ]
        },
        {
            title: "Sub-section title 2",
            contents: [
                {
                    title: "Cell title 3",
                    text: `Cell content 1\nCell content 2\nCell content 3`
                },
                {
                    title: "Cell title 4",
                    text: `Cell content 1\nCell content 2`
                }
            ]
        }
    ]
    render() {
        return (
            <section className="myself-profile-section ms-Grid py-4 px-5">
                <div className="ms-Grid-row px-5">
                    {this._sampleContents.map((sc, idx) => {
                        return <ProfileSubSection key={idx} title={sc.title} contents={sc.contents} />
                    })}
                </div>
            </section>
        )
    }
}