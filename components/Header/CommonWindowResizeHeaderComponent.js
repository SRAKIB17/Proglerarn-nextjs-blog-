import React, { useEffect } from 'react';

const useCommonWindowResizeHeaderComponent = () => {
    useEffect(() => {
        window.onresize = (e) => {
            try {
                // ------------------------------for hide navBar for  mobile Device only ------------------
                const hideMobileNab = window.localStorage.getItem('hideMobileNabBar');
                const getHeader = document.getElementById('header');
                const getHeaderBottomMargin = document.getElementById('topHeaderMargin');
                if (window.innerWidth > 640 || !hideMobileNab) {
                    getHeader.className = 'h-[60px] w-full border-b-2 bg-base-100 z-[150] fixed top-0'
                    getHeaderBottomMargin.className = 'mb-[60px]'

                }
                else if (window.innerWidth <= 640 && hideMobileNab) {
                    getHeader.className = 'h-[60px] w-full border-b-2 bg-base-100 z-[150] sticky top-0'
                    getHeaderBottomMargin.className = ''
                }
                else if (window.innerWidth <= 640 && !hideMobileNab) {
                    getHeader.className = 'h-[60px] w-full border-b-2 bg-base-100 z-[150] fixed top-0'
                    getHeaderBottomMargin.className = 'mb-[60px]'
                }
                // -----------------------------------support inbox -----------------------------------------
                const sendMessageSupportInboxForm = document.getElementById('sendMessageSupportInboxForm');
                document.getElementById('supportMessageBody').style.height = document.getElementById('SupportInbox').offsetHeight - (sendMessageSupportInboxForm.offsetHeight + 80) + 'px'
                //-----------------------------------------------------------------------------
                //----------when resize change automatic left side bar change layout-------------
                const sideLeftBarTitle = document.querySelectorAll('#sideLeftBarTitle')
                setTimeout(() => {
                    sideLeftBarTitle.forEach(title => {
                        title.style.display = 'none'
                    })
                }, 50);
                const sideLeftBar = document.getElementById('sideLeftBar')
                //for desktop
                if (window.innerWidth >= 1024) {
                    sideLeftBar.style.width = '64px'
                    sideLeftBar.style.left = '0px'
                }
                //for mobile
                else {
                    sideLeftBar.style.width = '200px'
                    sideLeftBar.style.left = '-200px'
                }
            }
            catch {

            }
        }

    }, [])
};

export default useCommonWindowResizeHeaderComponent;