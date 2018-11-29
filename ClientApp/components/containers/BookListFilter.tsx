import * as React from "react";
import { BookListFilterProps } from "../../types/book";
import { DefaultButton, BaseButton, Button } from "office-ui-fabric-react";
import { connect } from "react-redux";
import { bookActionCreators } from "../../actions/book";
import { BookVisibilityFilters } from "../../helpers/enums/BookVisibilityFilters";
import { BookState } from "../../reducers/book";
import { Dispatch, AnyAction } from "redux";

class BookListFilter extends React.Component<BookListFilterProps, {}> {
    constructor(props: BookListFilterProps) {
        super(props);
    }

    render() {
        return (
            <DefaultButton onClick={(e) => { this.props.onClick() }} className="p-3 mx-4">
                {this.props.text}
            </DefaultButton>
        )
    }
}

/**
 * Maps current state to container component's props.
 * @param state State to map to props of container component.
 * @param ownProps Props provided when using this component.
 */
function bookListFilterMapStateToProps(state: BookState, ownProps: { filter: BookVisibilityFilters, text: string }) {
    return {
        text: ownProps.text,
    };
}

/**
 * Maps dispatches to container component's props.
 * @param dispatch Dispatch to map to props of container component.
 * @param ownProps Props provided when using this component.
 */
function bookListFilterMapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: { filter: BookVisibilityFilters, text: string }) {
    return {
        onClick: () => {
            dispatch(bookActionCreators.setVisibilityFilterActionCreator(ownProps.filter))
        },
    }
}

/**
 * Container component, created by connecting state, dispatch to existing component.
 */
export const BookListFilterContainer = connect(bookListFilterMapStateToProps, bookListFilterMapDispatchToProps)(BookListFilter);
