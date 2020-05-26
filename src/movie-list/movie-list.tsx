import React, { useState, useEffect } from 'react'
import styles from './movie-list.module.scss'
import { useParams, Link, useHistory, Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchByName, getPopularList, sortByPopularityDesc } from '../service';

interface MovielistProps {
    query?: string;
    sortByMostPopular: boolean;
}

const MovieList = ({ query, sortByMostPopular }: MovielistProps) => {
    const [data, setData] = useState([]);
    let { searchParam } = useParams();
    searchParam = query || searchParam;
    const h = useHistory();

    const getMovieList = async (query: string) => {
        document.getElementById('loader')?.classList.add('loading');
        let result: Array<any> = [];
        if (query) {
            await searchByName(searchParam)
                .then(res => {
                    result = res[0].data.results.concat(res[1].data.results);
                    setData(sortByMostPopular ? sortByPopularityDesc(result) : result);
                })
                .catch(e => {
                    h.push({ pathname: `/error` });
                });
        } else {
            await getPopularList()
                .then(res => {
                    result = res.data.results;
                    setData(sortByMostPopular ? sortByPopularityDesc(result) : result);

                })
                .catch(e => {
                    h.push({ pathname: `/error` });
                });
        }

        document.getElementById('loader')?.classList.remove('loading');
        console.log(data);
    }

    useEffect(() => {
        getMovieList(searchParam);
    }, [searchParam]);

    const renderList = () => {
        return data.map((m: any, index: number) => {
            return <Link className={styles.row} key={index} to={`/movie/${m.id}`}>
                <div> {m.vote_average} </div>
                <div> <img src={m.poster_path ? `https://image.tmdb.org/t/p/w500/${m.poster_path}` : './no-image.jpg'} alt="Image unavailable" />  </div>
                <div> {m.title || m.name} </div>
            </Link>
        });
    }

    return <div className={styles.list}>
        {data.length ? renderList() : <div className={styles.noresults} >No result!</div>}
    </div>;
}

MovieList.propTypes = {
    query: PropTypes.string
};

MovieList.defaultProps = {
    query: '',
    sortByMostPopular: false
};

export default MovieList;

