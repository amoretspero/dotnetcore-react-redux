/**
 * Article list element's props type.
 */
export type ArticleListElementProps = {
    title: string,
    subtitle: string,
    createdAt: Date,
    updatedAt: Date,
    author: string,
}

/**
 * Article list's props type.
 */
export type ArticleListProps = {
    elements: ArticleListElementProps[],
}

export interface Article {
    id: number;
    title: string,
    subtitle: string,
    createdAt: Date,
    updatedAt: Date,
    author: string,
    content: string,
}