import { AppState } from "./reducer";
import { BookVisibilityFilter } from "../helpers/enums/BookVisibilityFilters";
import { BookStatus } from "../helpers/enums/bookStatus";
import { DateTime } from "luxon";

/**
 * Initial state.
 */
export const initialState: AppState = {
    visibilityFilter: BookVisibilityFilter.SHOW_ALL,
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
    articles: [
        {
            author: "The author",
            content: `## This is start of content.`,
            createdAt: DateTime.fromFormat("2018-12-08 19:30", "yyyy-LL-dd HH:mm").toJSDate(),
            updatedAt: DateTime.fromFormat("2018-12-08 19:30", "yyyy-LL-dd HH:mm").toJSDate(),
            id: "1",
            subtitle: "This is sample subtitle.",
            title: "This is sample title."
        },
        {
            author: "The author",
            content: `## This is middle of content.`,
            createdAt: DateTime.fromFormat("2018-12-08 18:30", "yyyy-LL-dd HH:mm").toJSDate(),
            updatedAt: DateTime.fromFormat("2018-12-08 18:30", "yyyy-LL-dd HH:mm").toJSDate(),
            id: "1",
            subtitle: "This is sample subtitle.",
            title: "This is sample title."
        },
        {
            author: "The author",
            content: `## This is end of content.`,
            createdAt: DateTime.fromFormat("2018-12-08 17:30", "yyyy-LL-dd HH:mm").toJSDate(),
            updatedAt: DateTime.fromFormat("2018-12-08 17:30", "yyyy-LL-dd HH:mm").toJSDate(),
            id: "1",
            subtitle: "This is sample subtitle.",
            title: "This is sample title."
        }
    ]
};