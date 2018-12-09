import { ShowdownExtension } from "showdown";
const { renderToString } = require("katex");

const defaultKatexConfig = {
    displayMode: true,
    throwOnError: false,
    errorColor: "#ff0000",
}

const defaultDelimiters = [
    { left: "$", right: "$", display: false },
    { left: "$$", right: "$$", display: true },
    // { left: "\\(", right: "\\)", display: false },
    // { left: "\\[", right: "\\]", display: true }
]

function escapeRegExp(str: string) {
    return str.replace(/[-[\]/{}()*+?.\\$^|]/g, "\\$&");
}

export const showdownKatex: (userConfig: any, userDelimiters: { right: string, left: string, display: boolean }[]) => ShowdownExtension[] = (userConfig: any, userDelimiters: { right: string, left: string, display: boolean }[]) => {
    return [
        {
            type: "output",
            filter: (text = "") => {
                const config = { ...defaultKatexConfig, ...userConfig };
                const delimiters = defaultDelimiters;
                for (const delim of userDelimiters) {
                    const existingDelimiter = delimiters.find((dl) => dl.right === delim.right && dl.left === delim.left);
                    if (existingDelimiter) {
                        existingDelimiter.display = delim.display;
                    } else {
                        delimiters.push(delim);
                    }
                }
                return delimiters.reduce((prv, cur) => {
                    const targetRegex = new RegExp(escapeRegExp(cur.left) + "(.*?)" + escapeRegExp(cur.right), "g");
                    let result = prv;
                    let matchArr: RegExpExecArray | null;
                    while (matchArr = targetRegex.exec(result)) {
                        if (
                            matchArr[0].length > cur.right.length + cur.left.length &&
                            matchArr[1].length > 0 &&
                            matchArr[1].indexOf(cur.right) !== 1 &&
                            matchArr[1].indexOf(cur.left) !== matchArr[1].length - 1
                        ) {
                            // TODO: Need more general and clean distinguishing strategy.
                            result = result.replace(matchArr[0], renderToString(matchArr[1], { ...config, displayMode: cur.display }));
                        }
                    }
                    return result;
                }, text);
            },
        },
    ];
}