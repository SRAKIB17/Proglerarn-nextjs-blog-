import Head from 'next/head';
import React from 'react';
import Bookmark from '../../components/Bookmark/Bookmark';
import Header from '../../components/Header/Header';

const Index = () => {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <title>
                    Bookmark
                </title>
            </Head>
            <Header />

            <div className='grid grid-cols-12'> 
                <div className='col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-4'>
                    <Bookmark />
                </div>
                <div className='hidden sm:block sm:col-span-7 md:col-span-6 lg:col-span-8'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid accusamus voluptate! Incidunt recusandae saepe, quam dolore autem quasi iure! Provident, est rem quis reiciendis beatae autem asperiores odio ratione.
                </div>
            </div>
        </div>
    );
};

export default Index;