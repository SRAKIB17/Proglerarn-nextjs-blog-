import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import NewPost from '../profile/NewPost/NewPost';
import { useRouter, withRouter } from 'next/router';
import { UserFullInfoProvider } from '../../pages/_app';


const ContextMenu = () => {
    const { user, user_details, isLoading } = useContext(UserFullInfoProvider)
    const router = useRouter();
  
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }

    const [newPost, setNewPost] = useState(null)
    const OpenNewPost = () => {
        // document.getElementById("newPostClose").style.width = "100%";
        setNewPost(true)
    }

    useEffect(() => {
        document.body.addEventListener('contextmenu', (e) => {
            if (window.innerWidth >= 640) {
                e.preventDefault()
                const pageX = e.clientX;
                const pageY = e.clientY;
                const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const getContextMenu = document.getElementById('contextMenu');
                getContextMenu.style.display = 'block';
                getContextMenu.style.top = pageY + 'px';
                getContextMenu.style.left = pageX + 'px';

                // const dataPost = e.target.hasAttribute('data-post');
                // if (dataPost) {
                //     const dataPostId = e.target.getAttribute('data-post')
                //     setPostShareId(dataPostId)
                // }
            }
        })

        document.onclick = (e) => {
            try {
                if (!e.target.hasAttribute('data-profile')) {
                    const getProfileMenu = document.getElementById('profileLogOut');
                    getProfileMenu.style.right = '-500px'
                }

            }

            catch {

            }
            try {
                const getContextMenu = document.getElementById('contextMenu');
                // setPostShareId(null)
                getContextMenu.style.display = 'none'
            }
            catch {

            }
        }


        //------------------------------------------------------ change router by touch event --------------------------------
        const getValue = []
        document.documentElement.ontouchmove = (e) => {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            getValue.push(x)
            const getX = getValue[0] - getValue[getValue.length - 2]
            if (getX > 100 && !isNaN(getX)) {
                const pathname = router.pathname.split('/')[1];

                if (router.pathname === '/') {
                    navigate('/story')
                }
                else if (pathname === 'story') {
                    navigate('/videos')
                }
                else if (pathname === 'videos') {
                    navigate('/profile')
                }
                else {

                }
                getValue = []
            }
            else if (getX < -100) {
                const pathname = router.pathname.split('/')[1];
                if (pathname === 'story') {
                    navigate('/')
                }
                else if (pathname === 'videos') {
                    navigate('/story')
                }
                else if (pathname === 'profile') {
                    navigate('/videos')
                }
                getValue = []
            }

        }
        document.documentElement.ontouchend = (e) => {
            getValue = []
        }

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
    //--------------------------------------------------------------------------------------------------------------
    return (
        <div>

            <div className='absolute hidden z-[100] ' id='contextMenu' >
                <ul className="menu bg-base-300 p-2 rounded-box w-40">
                    {/* {
                        postShareId &&
                        <>
                            <li className='hover-bordered'>
                                <button>
                                    Shortener Url
                                </button>
                            </li>

                        </>
                    } */}
                    <li className='hover-bordered'>
                        <button onClick={() => navigate('/story')}>
                            Story
                        </button>
                    </li>
                    {
                        user?.user &&
                        <>
                            <li>
                                <button onClick={() => navigate('/profile')}>
                                    Profile
                                </button>
                            </li>

                            <li>
                                <button className='btn btn-sm btn-primary rounded-3xl btn-outline'
                                    onClick={() => { OpenNewPost() }}
                                >
                                    New Post
                                </button>
                            </li>
                        </>
                    }
                </ul>
            </div>

            {
                newPost &&
                <NewPost props={setNewPost} />
            }
        </div>
    );
};

export default ContextMenu;