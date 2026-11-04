export interface ISource {
    id: string;
    name: string;
}

export interface IArticle {
    source: ISource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export interface ISourcesResponse {
    status: string;
    sources: ISource[];
}