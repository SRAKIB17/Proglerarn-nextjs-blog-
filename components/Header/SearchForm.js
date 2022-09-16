import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Delete, SearchIcon } from '../ReactRSIcon/index'

const SearchForm = () => {
    const [showFormMobile, setShowFormMobile] = useState(false);
    const focusSearchBoxHandle = () => {
        setShowFormMobile(true)
    }
    const router = useRouter()
    const searchHandle = async (e) => {
        e.preventDefault()
        const searchValue = e.target.search.value.trim()

        const getLocalSearchObj = await localStorage.getItem('search')
        if (getLocalSearchObj) {
            const searchParch = JSON.parse(getLocalSearchObj)
            const check = await searchParch?.search?.includes(searchValue);
            if (!check) {
                searchParch?.search?.push(searchValue);
                localStorage.setItem('search', JSON.stringify(searchParch))
            }
        }
        else {
            const search = { search: [searchValue] }
            localStorage.setItem('search', JSON.stringify(search))
        }
        setShowFormMobile(null)
        router.push('/search/' + searchValue)
        router.prefetch('/search/' + searchValue)
    }

    const saveSearch = typeof window !== 'undefined' && window.localStorage ? JSON.parse(window.localStorage.getItem('search')) : {}
    const [saveSearchHistory, setSaveSearchHistory] = useState(saveSearch)
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }

    const deleteAllSearchActivity = () => {
        localStorage.removeItem('search');
        setSaveSearchHistory({})
    }
    return (
        <div>
            <ul className="menu menu-horizontal p-0 flex md:hidden">
                <li>
                    <button onClick={() => setShowFormMobile(!showFormMobile)}><SearchIcon color='grey' size='25' /></button>
                </li>
            </ul>

            {/* ---------------------------------for mobile section -------------------------------*/}
            {showFormMobile &&
                <div className='fixed flex top-[60px] w-full bg-base-100 left-0 h-full border-b-2'>
                    <div className='absolute top-[15px] left-[40px] flex md:hidden'>
                        <form onSubmit={searchHandle}>
                            <input type="search" name="search" placeholder='🔍' className='input input-sm pl-1 w-[250px] input-secondary bg-base-300' id="mobileSearchField" />
                            <input type="submit" value="🔍" className='btn btn-primary btn-sm outline-none ml-1' />
                        </form>
                    </div>
                    {/*---------------------- for recent search result-------------------------*/}
                    <div className='mt-[60px] md:ml-[70px] md:mt-0 m-4'>

                        {/* ----------------for close search  ---------------*/}

                        <div className='absolute right-3 md:right-20 top-5'>
                            <button className='btn btn-xs btn-outline btn-warning ' onClick={() => setShowFormMobile(false)}>
                                X
                            </button>
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center'>
                                <h1 className='underline text-xl font-medium'>Your recent search</h1>
                                <button onClick={deleteAllSearchActivity} className="ml-4 btn btn-xs btn-secondary btn-outline">
                                    <Delete />
                                </button>
                            </div>
                            <div className='flex gap-2 flex-wrap mt-2'>

                                {
                                    saveSearchHistory?.search?.map((value, index) =>
                                        <button key={index} className='btn btn-xs btn-outline btn-info' onClick={() => navigate('/search/' + value)}>
                                            {value}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='hidden md:block fixed left-[30px] top-[15px] border rounded-lg' >
                <form onSubmit={searchHandle}>
                    <input type="search" name="search" placeholder='🔍' className='input h-[30px] pl-1 input-ghost bg-base-300 w-40' id="laptopSearchField" onKeyUp={focusSearchBoxHandle} />
                </form>
            </div>
        </div>
    );
};

export default SearchForm;