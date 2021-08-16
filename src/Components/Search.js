import React, { useState } from 'react';
import classes from '../App.module.css';

const Search = (props) => {
    const [search, setSearch] = useState({ query: null });

    const handleSearchChange = async (e) => {
    	console.log('shortcuts from the search compnent: ', e.target.value)
        let checkType = e.target.value.includes("†")
        console.log('in the type 1', checkType)
        if (checkType) {
        	console.log('in the type 2')
            let final = e.target.value.replace("†", "type:");
            setSearch({ query: final });
            return;
        }

        let checkFrom = e.target.value.includes("ƒ")
        if (checkFrom) {
            let final = e.target.value.replace("ƒ", "from:");
            setSearch({ query: final });
            return;
        }

        let checkBookmark = e.target.value.includes("∫")
        if (checkBookmark) {
            let final = e.target.value.replace("∫", " ");
            setSearch({ query: final });
            console.log('send message to bookmark')

            window.postMessage({
                type: "SAVE_LINK",
                url: window.location.href
            }, "*");

            return;
        }

        setSearch({ query: e.target.value });
    }

    const handleSearch = (e) => {
        console.log('event from the search compnent: ', e)
        if (e.key === "Enter") {
            window.postMessage({
                type: "OPEN_SEARCH",
                query: e.target.value
            }, "*");
        }

        if (e.key === "Escape") {
            window.postMessage({
                type: "CLOSE_APP",
            }, "*");
        }

        if (e.key === "Escape") {
            window.postMessage({
                type: "CLOSE_APP",
            }, "*");
        }
    }

    const handleCloseModal = () => {
		window.postMessage({ type: "CLOSE_APP" }, "*");
    }

    return ( 
    	<div>
        	<input 
				className={classes.modalSearchInput}
				value={search.query}
				ref={input => input && input.focus()}
				autocomplete="off" 
                placeholder="Search your Slate..."
                onKeyDown={(e) => {handleSearch(e)}}
                onChange={(e) => {handleSearchChange(e)}}
			/> 
		    <div 
				className={classes.modalCloseButton}
				style={{ position: 'absolute', right: '0px', top: '14px', color: '#48494A', cursor: 'pointer' }}
				onClick={handleCloseModal}
            >X</div>
		</div>
    );
};

export default Search;