import { Loader } from './loader';
import { INewsResponse, ISourcesResponse } from './types'; 

class AppLoader extends Loader<INewsResponse | ISourcesResponse> {
    constructor() {
        const baseUrl = process.env.API_URL || 'https://rss-news-api.onrender.com/';
        
        super(baseUrl, {
            apiKey: process.env.API_KEY as string,
        });
    }
}

export default AppLoader;