import api from "./axios-instance";
import Axios from "axios";

export const getPopularList = async () => {
    document.getElementById('loader')?.classList.add('loading');
    let response = await api.get(`/movie/popular`);
    document.getElementById('loader')?.classList.remove('loading');
    return response.data.results;
}

export const searchByName = async (query: string) => {

    const params = { query };
    document.getElementById('loader')?.classList.add('loading');
    let response = await Axios.all([
        api.get(`/search/movie`, { params }),
        api.get(`/search/tv`, { params })]);
    document.getElementById('loader')?.classList.remove('loading');

    return response[0].data.results.concat(response[1].data.results);
}

export const sortByPopularityDesc = (result: any) => {
    result = result.sort((m1: any, m2: any) => {
        if (m1.popularity < m2.popularity) {
            return 1;
        }
        if (m1.popularity > m2.popularity) {
            return -1;
        }
        return 0;
    });
    return result;
}