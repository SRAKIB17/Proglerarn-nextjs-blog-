import React from 'react';
import Header from '../components/Header/Header';

import { useRouter } from 'next/router'
import NotFound from '../components/BLOG/NotFound';

const Index = () => {
    const router = useRouter()
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }
    return (
        <div>
            <NotFound />
        </div>
    );
};

export default Index;