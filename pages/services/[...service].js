import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { useQuery } from 'react-query';
const Service = () => {
    const { query } = useRouter()
    const { data } = useQuery('data', () => axios.get('/api/hello'));


    return (
        <div>
            <Header />
           
        </div>
    );
};

export default Service;