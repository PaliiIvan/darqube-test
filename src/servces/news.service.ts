import { News } from "../types/news.model";


const baseUrl = ' https://finnhub.io/api/v1/';
const action = 'company-news';
const params = '?symbol=AAPL&from=2021-03-01&to=2021-03-15&token=bpjsf67rh5r9328ecgvg';

export async function fetchNews() {
    const responseResult = await fetch(`${baseUrl}${action}${params}`, { method: 'GET' });

    const newsArray = await responseResult.json() as Array<News>;

    return newsArray;
}