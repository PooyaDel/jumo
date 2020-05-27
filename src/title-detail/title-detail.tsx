import React, { useEffect, useState } from 'react'
import styles from './title-detail.module.scss'
import { useParams, useHistory } from 'react-router-dom';
import { searchByName, sortByPopularityDesc, getTitleDetails } from '../service';
import { any } from 'prop-types';
import { faBackward, faArrowCircleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TitleDetailProps {
}

const TitleDetail = ({ }: TitleDetailProps) => {
    const { id } = useParams();
    const h = useHistory();

    const [data, setData] = useState<any>({});

    const titleDetails = async (id: number) => {
        document.getElementById('loader')?.classList.add('loading');
        await getTitleDetails(id)
            .then((res: any) => {
                setData(res.data);
            }).catch(e => (h.push({ pathname: `/error` })))

        document.getElementById('loader')?.classList.remove('loading');
        console.log(data);
    }

    useEffect(() => {
        titleDetails(id);
    }, [id]);

    return id ? <div className={styles.titledetail}>
        <div className={styles.backdrop}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <img src={`${process.env.REACT_APP_IMG_BASE_URL}${data?.backdrop_path}`} alt="" /></div>
        <div className={styles.poster}> <img src={`${process.env.REACT_APP_IMG_BASE_URL}${data?.poster_path}`} alt="" /> </div>
        <div>{data?.overview}</div>
        <div>{data?.runtime}</div>
        <div>{data?.vote_average}</div>
        <div>{data?.release_date}</div>
    </div> : <div>Title id has not been provided.</div>;

}

export default TitleDetail;