import axios from 'axios';
import React, { useState } from 'react';
import category from './Category.module.css'
import { useRouter } from 'next/router';
import styles from '../profile/NewPost/NewPost.module.css'
import { useQuery } from 'react-query'
import LoadingSpin from '../LoadingSpin';


const Category = () => {

    function closeCategoryModal() {
        document.getElementById("OpenCategoryModal").style.width = "0";
        document.getElementById("OpenCategoryModal").style.borderRightWidth = "0px";
    }
    const badge = [' btn-primary', ' btn-secondary', ' btn-accent', ' btn-info', ' btn-warning', ' btn-accent', ' btn-success'];

    const showTagsHandleMouseEnter = (id, event) => {
        try {
            if (event.type === 'mouseenter') {
                document.getElementById('category' + id).style.height = '100%'
            }
            else if (event.type === 'mouseleave') {
                document.getElementById('category' + id).style.height = '0px'
            }
        }
        catch {

        }
    }
    const router = useRouter()
    const navigate = (url) => {
        router.push(url)
        router.prefetch(url)
    }

    const { data, refetch, isLoading } = useQuery(['categoryAll'], () => axios.get(`/api/category`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))
    return (
        <div>

            <div id="OpenCategoryModal" className={styles.NewPostNav + ' bg-base-100 '}>

                <a href="#" className={styles.closebtn} onClick={closeCategoryModal}>&times;</a>
                <div className='w-full h-full overflow-auto p-4 border-t-2'>
                    <ul className="menu menu-vertical p-0 flex-col gap-1">

                        {
                            isLoading ?
                                <LoadingSpin /> :
                                data?.data?.map((i, index) =>

                                    <div key={i} onMouseLeave={(event) => showTagsHandleMouseEnter(i?.category + index, event)} onMouseEnter={(event) => showTagsHandleMouseEnter(i?.category + index, event)}>
                                        <li className='btn btn-outline btn-primary text-left rounded-md'>
                                            {i?.category}
                                        </li>

                                        <div className={category.showTags} id={'category' + i?.category + index} >
                                            <div onClick={() => navigate(`/story?cat=${i?.category}`)} className={"m-2 btn btn-xs btn-outline cursor-pointer " + badge[Math.floor(Math.random() * badge.length)]}>
                                                {i?.category}
                                            </div>
                                            <div className='flex flex-wrap gap-2 ml-6 p-2'>
                                                {
                                                    i?.tags?.map(tag =>
                                                        <div onClick={() => navigate(`/story?cat=${i?.category}&tag=${tag}`)} key={tag} className={"btn btn-xs btn-outline cursor-pointer " + badge[Math.floor(Math.random() * badge.length)]}>
                                                            {tag}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                        }
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Category;