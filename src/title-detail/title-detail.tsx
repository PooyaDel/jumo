import React, { useEffect, useState } from 'react'
import styles from './title-detail.module.scss'
import { useParams, useHistory } from 'react-router-dom';
import { searchByName, sortByPopularityDesc, getTitleDetails } from '../service';
import { any } from 'prop-types';
import { faBackward, faArrowCircleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TitleDetailProps {
}
const getPercentageUserVotes = (v: number) => (v ? `${v * 100 / 10}% User Score` : 'N/A');
const convertToHour = (minutes: any) => {
    if (!minutes) {
        return 'N/A';
    }
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min} min`;
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
    }

    const goBack = () => (h.goBack());

    useEffect(() => {
        titleDetails(id);
    }, [id]);

    return id ? <div className={styles.titledetail}>
        <div className={styles.backdrop}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} />
            {data?.backdrop_path ?
                <img src={`${process.env.REACT_APP_IMG_BASE_URL}${data?.backdrop_path}`} alt="" />
                : <img src={'./no-image.jpg'} alt="" />
            }
        </div>
        <div className={styles.poster}>
            {data?.poster_path ? <img src={`${process.env.REACT_APP_IMG_BASE_URL}${data?.poster_path}`} alt="" />
                : <img src={'./no-image.jpg'} alt="" />
            }
            <div className={styles.title}>{data?.title}
                <div>
                    <div className={styles.rdate}> {data?.release_date ? new Date(data?.release_date).getFullYear() : 'N/A'}</div>
                    <span>
                        <ul>
                            <li>{getPercentageUserVotes(data?.vote_average)}</li>
                        </ul>
                    </span>
                </div>
                <div >
                    {convertToHour(data?.runtime)}
                </div>

            </div>
        </div>
        <div className={styles.overView} >Overview</div>
        <div className={styles.titleDetailText}>{data?.overview}</div>
    </div> : <div>Title id has not been provided.</div>;

}

export default TitleDetail;