import { BookVisibilityFilters } from "../helpers/enums/BookVisibilityFilters";
import { BookStatus } from "../helpers/enums/bookStatus";
import { KnownBookAction } from "actions/book";
import { combineReducers } from "redux";
import { Book } from "../types/book";

/**
 * State for book section.
 * 
 * TODO: Must combined with other states to make single state of app.
 */
export interface BookState {
    visibilityFilter: BookVisibilityFilters;
    books: Book[];
}

/**
 * Initial state.
 */
export const initialState: BookState = {
    visibilityFilter: BookVisibilityFilters.SHOW_ALL,
    books: [
        {
            author: "정재찬",
            id: "1",
            status: BookStatus.FINISHED,
            title: "시를 잊은 그대에게",
        },
        {
            author: "유홍준",
            id: "2",
            status: BookStatus.PENDING,
            title: "나의 문화유산 답사기 - 산사순례"
        },
        {
            author: "로베르트 융크",
            id: "3",
            status: BookStatus.READING,
            title: "천 개의 태양보다 밝은 - 우리가 몰랐던 원자과학자들의 개인적 역사"
        },
        {
            author: "노엄 촘스키",
            id: "4",
            status: BookStatus.PENDING,
            title: "불평등의 이유"
        },
        {
            author: "스튜어트 켈스",
            id: "5",
            status: BookStatus.PENDING,
            title: "더 라이브러리 - 유혹하는 도서관"
        },
        {
            author: "마르쿠스 가브리엘",
            id: "6",
            status: BookStatus.PENDING,
            title: "나는 뇌가 아니다"
        },
        {
            author: "정재찬",
            id: "7",
            status: BookStatus.PENDING,
            title: "그대를 듣는다"
        },
        {
            author: "스케일",
            id: "8",
            status: BookStatus.READING,
            title: "스케일"
        },
        {
            author: "버트런드 러셀",
            id: "9",
            status: BookStatus.FINISHED,
            title: "게으름에 대한 찬양"
        },
        {
            author: "알프레드 아들러",
            id: "10",
            status: BookStatus.FINISHED,
            title: "아들러의 인간이해"
        },
        {
            author: "가이 스탠딩",
            id: "11",
            status: BookStatus.FINISHED,
            title: "기본소득"
        },
        {
            author: "닐 디그래스 타이슨",
            id: "12",
            status: BookStatus.FINISHED,
            title: "블랙홀 옆에서"
        },
        {
            author: "키티 퍼거슨",
            id: "13",
            status: BookStatus.FINISHED,
            title: "스티븐 호킹"
        },
        {
            author: "짐 콜린스",
            id: "14",
            status: BookStatus.PENDING,
            title: "좋은 기업을 넘어 위대한 기업으로"
        },
        {
            author: "유시민",
            id: "15",
            status: BookStatus.FINISHED,
            title: "역사의 역사"
        }
    ],
};

/**
 * Reducer for visibilityFilter.
 * @param state Previous state, only containing visibilityFilter.
 * @param action Action to perform on previous state.
 */
export function visibilityFilterReducer(state = BookVisibilityFilters.SHOW_ALL, action: KnownBookAction) {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.visibilityFilter;
        default:
            return state;
    }
}

/**
 * Reducer for books.
 * @param state Previous state, only containing books.
 * @param action Action to perform on previous state.
 */
export function bookReducer(state = [] as Book[], action: KnownBookAction) {
    switch (action.type) {
        case "ADD_BOOK":
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    author: action.author,
                    status: action.status,
                }
            ];
        case "CHANGE_BOOK_STATE":
            return state.map((book) => {
                if (book.id === action.id) {
                    book.status = action.status;
                    return book;
                } else {
                    return book;
                }
            });
        case "REMOVE_BOOK":
            return state.filter((book) => book.id !== action.id);
        case "UPDATE_BOOK":
            return state.map((book) => {
                if (book.id === action.id) {
                    book.title = action.title || book.title;
                    book.author = action.author || book.author;
                    return book;
                } else {
                    return book;
                }
            });
        default:
            return state;
    }
}

/**
 * Combined reducer of visibilityFilter and book reducers.
 * 
 * This combined reducer is root reducer for book section.
 */
const bookListReducer = combineReducers<BookState, KnownBookAction>({
    visibilityFilter: visibilityFilterReducer,
    books: bookReducer,
})

export default bookListReducer;
