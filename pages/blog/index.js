import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Index = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace('/blog/post')
    }, [])
    return (
        <div>

        </div>
    );
};

export default Index;