import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import PageDetailsSEO from '../../components/BLOG/hooks/PageDetailsSEO';
import InboxBody from '../../components/BLOG/Inbox/InboxBody';
import InboxUserList from '../../components/BLOG/Inbox/InboxUserList';
import NotFound from '../../components/BLOG/NotFound';
import Right_arrow from '../../components/BLOG/Settings/SvgComponent/Right_arrow';
import usePrivatePageCheckUser from '../../components/hooks/checkUser/privatePageCheckUser';
import LoadingSpin from '../../components/LoadingSpin';
import { UserFullInfoProvider } from '../_app';

const Index = () => {
    const [userList, setUserList] = useState([])
    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);

    const [specificId, setSpecificId] = useState("9b836a9c57a91ce7805cc6a0")
    const showSpecificUserMessageHandle = (id) => {
        setSpecificId(id)
    }

    usePrivatePageCheckUser('/inbox')
    if (isLoading) {
        return <LoadingSpin />
    }
    if (!user?.user) {
        return <NotFound />
    }
    const { title } = PageDetailsSEO()
    return (
        <div>
            <Head>
                <title>
                    {
                        title
                    }
                    &nbsp; || Inbox 

                </title>
            </Head>
            <div>
                <div className="drawer drawer-mobile">
                    <input id="settingsMenuContent" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col hideScrollBar ">
                        {/* <!-- Page content here --> */}
                        <div>
                            <label
                                htmlFor="settingsMenuContent"
                                className="btn btn-ghost drawer-button lg:hidden m-1"
                            >
                                <Right_arrow strokeWidth='16' />
                            </label>
                        </div>
                        <div>
                            <InboxBody specificId={specificId} setUserList={setUserList} />
                        </div>
                    </div>
                    {/* ************** DRAWER MENU****************** */}
                    <InboxUserList showSpecificUserMessageHandle={showSpecificUserMessageHandle} userList={userList} />
                </div>


            </div>
        </div>
    );
};

export default Index;