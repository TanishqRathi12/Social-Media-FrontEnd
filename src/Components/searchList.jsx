import React, { useContext, useEffect, useState } from 'react';
import { searchContest } from '../Context/context';

const SearchList = () => {
    const search = useContext(searchContest);
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        setSearchResults(search);
    }, [search]);

    console.log(searchResults);

    return (
        <div className='m-10 text-white'>
            <h2 className='text-2xl'>Search Results</h2>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchList;
