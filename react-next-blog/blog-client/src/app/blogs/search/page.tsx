'use client';
import React, {useEffect, useState} from 'react';
import {BlogTable} from "@/app/components/BlogTable";
import {useRouter} from "next/navigation";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [hasSearched, setHasSearched] = useState(false);
    const handleHasSearched = (searched: boolean) => {
        setHasSearched(searched);
    };

    function handleInputChange(event: any) {
        const {name, value} = event.target;
        setSearchQuery(value);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        setHasSearched(true);

    }
    return (
        <>
            <div className="card my-3 bg-white">
                <div className="card-header bg-white">
                    <h4>Search Blogs</h4>
                </div>
                <div className="card-body">
                    <form className="form py-3 text-center" method="post" onSubmit={handleSubmit}>
                        <div className="d-flex align-items-baseline mb-3">
                            <label htmlFor="search-blogs" className="ms-2">Title</label>
                            <input id="search-blogs" className="form-control mr-sm-2 mx-3" type="search"
                                   name="searchQuery"
                                   onChange={handleInputChange}
                                   placeholder="Search" aria-label="Search"/>
                        </div>
                        <button className="btn btn-outline-success text-center mt-5 my-sm-0"
                                type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
            <div className="card bg-white border-0">
                <div className="card-header">
                    <h4 className="py-2 ">List Blog</h4>
                </div>
                <div className="card-body">
                    <BlogTable searchQuery={searchQuery} onHasSearched={handleHasSearched} />
                </div>
            </div>
        </>
    );
};

export default SearchPage;