import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import LoadingSpin from '../../LoadingSpin';
import Right_arrow from '../Settings/SvgComponent/Right_arrow';
import styles from './header.module.css'

const Category = () => {
    const { data, refetch, isLoading } = useQuery(['categoryAll'], () => axios.get(`/api/post/category`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))

    const router = useRouter()

    const navigate = path => {
        router.replace(path)
    }
    const { cat, tag, page } = router.query;



    return (
        <>
            <ul className="menu  gap-1 bg-primary p-4">

                {
                    isLoading ?
                        <div>
                            <div className='flex justify-center pt-8 mb-8 overflow-hidden'>
                                <div className='animate-spin text-center  border-l-4 w-28 h-28 rounded-[50%] border-secondary'>
                                </div>
                            </div>
                        </div>
                        :
                        data?.data?.map((i, index) =>


                            <div key={i} >
                                <div className="collapse collapse-arrow bg-base-100  rounded-sm w-56">
                                    <input
                                        type="checkbox"
                                        className='peer' />
                                    <div
                                        className="collapse-title bg-primary text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content"
                                    >
                                        {i?.category}
                                    </div>
                                    <div
                                        className="collapse-content bg-primary text-primary-content  peer-checked:bg-base-100 peer-checked:text-base-content"
                                    >
                                        <ul
                                            className="menu w-full "
                                        >
                                            <li>
                                                <button
                                                    onClick={() => navigate(`/blog/post?cat=${i?.category}`)}
                                                >
                                                    {
                                                        i.category
                                                    }
                                                </button>
                                            </li>
                                            {
                                                i?.tags?.map(tag =>
                                                    <li
                                                        key={tag}
                                                    >
                                                        <a
                                                            onClick={() => navigate(`/blog/post?cat=${i?.category}&tag=${tag}`)}
                                                            className={" cursor-pointer btn-ghost "}
                                                        >
                                                            {tag}
                                                        </a>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        )
                }
            </ul>
        </>
    );
};

export default Category;