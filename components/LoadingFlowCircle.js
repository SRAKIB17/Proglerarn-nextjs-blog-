import React from 'react';

import styles from './LoadingFlowCircle.module.css'
const LoadingFlowCircle = () => {
    return (
        <div className='p-4'>
            <div className={styles.loading}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
        </div>
    );
};

export default LoadingFlowCircle;