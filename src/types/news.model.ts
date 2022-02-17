export type News = {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
    isInBookmarks: boolean;
}

export type EmptyFn<T> = {
    (): T
}

export const emptyFn = () => { };