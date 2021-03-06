import React, { useEffect, useState } from 'react'
import styles from './search.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useParams, useHistory } from 'react-router-dom'
interface SearchProps {
    onSearch?: (value: any) => void
}

const Search = ({ onSearch }: SearchProps) => {
    const h = useHistory();
    let inputRef = React.createRef<HTMLInputElement>();
    let { searchParam } = useParams();
    const [textValue, setTextValue] = useState('');
    const updateSearchValue = () => {
        h.push({ pathname: `/search/${inputRef.current?.value}` });
        onSearch?.(inputRef.current?.value);
    }

    const handleChange = (event: any) => {
        setTextValue(event.target.value);
    };

    useEffect(() => {
        setTextValue(searchParam);
    }, [searchParam]);

    const keyPress = (event: any) => {
        const code = event.keyCode || event.which;
        if (code !== 13) {
            return;
        }
        updateSearchValue();
    }

    return <div className={styles.search}>
        <input type="text" placeholder="Search" value={textValue || ''} ref={inputRef} onChange={handleChange} onKeyPress={keyPress} />
        <FontAwesomeIcon icon={faSearch} className={styles.icon} onClick={updateSearchValue} />
    </div>
}

export default Search;
