import api from "./axios-instance";
import Axios from "axios";

export const getPopularList = () => {
    return api.get(`/movie/popular`);
}

export const getTitleDetails = (id: number) => {
    return api.get(`/movie/${id}`);
}

export const searchByName = (query: string) => {
    const params = { query };
    return Axios.all([
        api.get(`/search/movie`, { params }),
        api.get(`/search/tv`, { params })]);
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