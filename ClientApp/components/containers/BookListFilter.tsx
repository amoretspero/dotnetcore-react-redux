import * as React from "react";
import { BookListFilterProps, BookListFilterContainerProps } from "../../types/book";
import { DefaultButton, BaseButton, Button } from "office-ui-fabric-react";
import { connect } from "react-redux";
import { bookActionCreators } from "../../actions/book";
import { BookVisibilityFilter } from "../../helpers/enums/BookVisibilityFilters";
import { AppState } from "../../reducers/reducer";
import { Dispatch, AnyAction } from "redux";

class BookListFilter extends React.Component<BookListFilterProps, {}> {
    private _filter: BookVisibilityFilter;

    constructor(props: BookListFilterProps) {
        super(props);
        this._filter = props.ownFilter;
    }

    render() {
        return (
            <DefaultButton primary={this._filter === this.props.currentFilter} onClick={(e) => { this.props.onClick() }} className="p-3 mx-4">
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
function bookListFilterMapStateToProps(state: AppState, ownProps: BookListFilterContainerProps): BookListFilterProps {
    return {
        onClick: () => { },
        text: ownProps.text,
        currentFilter: state.visibilityFilter,
        ownFilter: ownProps.filter,
    };
}

/**
 * Maps dispatches to container component's props.
 * @param dispatch Dispatch to map to props of container component.
 * @param ownProps Props provided when using this component.
 */
function bookListFilterMapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: BookListFilterContainerProps) {
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
