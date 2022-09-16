import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const RightSideLg = () => {
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
    const badge = [' btn-primary', ' btn-secondary', ' btn-accent', ' btn-info', ' btn-warning', ' btn-accent', ' btn-success'];

    return (
        <div>
            <div>
                <div className='flex flex-wrap gap-2 p-2 h-40 overflow-auto'>
                    {
                        data?.data.map(i => i?.tags?.map(tag =>
                            <div onClick={() => navigate(`/story?cat=${i?.category}&tag=${tag}`)} key={tag} className={"btn btn-xs btn-outline cursor-pointer " + badge[Math.floor(Math.random() * badge.length)]}>
                                {tag}
                            </div>
                        )
                        )
                    }
                </div>

                <div className='w-[90%] mt-4'>
                    <a href="https://wap4dollar.com/ad/serve.php?id=aqrfshf5g1" className='text-xl text-blue-500 '> Download Now</a>
                    <code>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam cupiditate quia adipisci voluptatem doloremque! Veniam asperiores odio, laborum voluptatum, hic libero nostrum ullam maxime corporis nesciunt reprehenderit. Est, ex cupiditate.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates laboriosam earum, voluptatem consectetur quo eum sint. Tempora numquam reprehenderit saepe adipisci animi, voluptate asperiores aspernatur optio nemo mollitia tenetur dolorem!
                    </code>
                </div>
            </div>

        </div>
    );
};

export default RightSideLg;