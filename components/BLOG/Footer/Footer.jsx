/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Facebook } from '../../ReactRSIcon';
import Youtube from './Youtube';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-[#1F2937] text-white">
            <div>
                <img src="/proglearn_logo.png" alt="" className='max-w-[150px] sm:max-w-[200px] w-full' />
                <p>ProgLearn</p>
            </div>
            <div>
                <span className="footer-title">Social</span>
                <div className="grid grid-flow-col gap-4">
                    <button className='text-white hover:text-[#1195F5]'>
                        <Facebook size='25' />
                    </button>
                    <button className='text-white hover:text-[red]'>
                        <Youtube size='41'/>
                    </button>

                </div>
            </div>
        </footer>
    );
};

export default Footer;