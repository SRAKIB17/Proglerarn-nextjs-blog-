/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react';
import styles from './NotFound.module.css'
const NotFound = () => {
    const router = useRouter()

    return (
        <div className=' min-h-screen'>
            {/* <div className='flex justify-center'>
                <div className={styles.four}>
                    <button>
                        <img src="/NotFound.svg" alt="" />
                    </button>
                </div>
            </div>

            <div className='flex justify-center flex-col items-center'>
                <p>ARE YOU LOST?</p>
                <p>Do you want to go <a href="https://codepen.io/TWAIN/">home</a>?</p>
            </div> */}
            <section className={styles.page_404}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="text-center">
                                <div className={styles.four_zero_four_bg}>
                                    <h1>404</h1>
                                </div>

                                <div className=" flex justify-center flex-col  gap-2">
                                    <h3 className="text-[32px] sm:text-[50px]">
                                        Look like you{"'"}re lost
                                    </h3>
                                    <p className='text-xl md:text-[32px]'>the page you are looking for not avaible!</p>

                                    <button onClick={() => { router.replace('/') }} className="text-primary text-xl link-hover">
                                        Go to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotFound;



