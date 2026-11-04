export interface ILoadOptions {
    [key: string]: string | number | boolean;
}

export class Loader<T> {
    private baseLink: string;
    private options: ILoadOptions;

    constructor(baseLink: string, options: ILoadOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<R = T>(
        { endpoint, options = {} }: { endpoint: string; options?: ILoadOptions },
        callback: (data: R) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<R>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: ILoadOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<R>(
        method: string,
        endpoint: string,
        callback: (data: R) => void,
        options: ILoadOptions = {}
    ): void {
        const fetchOptions: RequestInit = { method };

        fetch(this.makeUrl(options, endpoint), fetchOptions)
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<R>) 
            .then((data: R) => callback(data))
            .catch((err) => console.error(err));
    }
}