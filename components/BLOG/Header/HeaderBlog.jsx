import React, { useEffect } from 'react';
import autoJwtTokenGenerateForUserOrGuest from '../../hooks/autoJwtTokenGenerateForUserOrGuest';
import MenuHeader from './MenuHeader';
import ProfilePicHeader from './ProfilePicHeader';
import SearchBtn from './Search/SearchBtn';

const HeaderBlog = () => {
    autoJwtTokenGenerateForUserOrGuest();

    useEffect(() => {
        //**--------------------------------disabled zoom and ctrl key with F12 ------------------------------------------- */
        window.onkeyup = (e) => {
            if (e.key === 'F12') {
                e.preventDefault()
                return false
            }
        }
        window.onkeydown = (e) => {
            if (e.key === 'F12') {
                e.preventDefault()
                return false
            }
            if (e.ctrlKey == true && (e.which == '61' || e.which == '107' || e.which == '173' || e.which == '109' || e.which == '187' || e.which == '189')) {
                e.preventDefault()
                return false
            }
        }
        window.onkeypress = (e) => {
            if (e.key === 'F12') {
                e.preventDefault()
                return false
            }
        }

        // for disabled mouse wheel
        document.addEventListener('wheel', (event) => {
            if (event.ctrlKey == true) {
                event.preventDefault();
            }
        }, { passive: false });
    }, [])
    return (
        <div>
            <div className="navbar bg-primary h-10 xl:pl-10 xl:pr-2 ">

                <div className="flex-1 z-50">
                    <MenuHeader />
                </div>

                <div className="flex-none ">
                    <div className="dropdown dropdown-end">
                        <SearchBtn />
                    </div>
               
                    <div className="dropdown dropdown-end">

                        {/* <label tabIndex="0" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </label>
                        <div tabIndex="0" className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="dropdown dropdown-end">
                        <ProfilePicHeader />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderBlog;