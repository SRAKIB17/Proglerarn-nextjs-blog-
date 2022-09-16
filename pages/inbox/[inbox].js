import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PageDetailsSEO from '../../components/BLOG/hooks/PageDetailsSEO';
import InboxBody from '../../components/BLOG/Inbox/InboxBody';
import InboxUserList from '../../components/BLOG/Inbox/InboxUserList';
import NotFound from '../../components/BLOG/NotFound';
import Right_arrow from '../../components/BLOG/Settings/SvgComponent/Right_arrow';
import usePrivatePageCheckUser from '../../components/hooks/checkUser/privatePageCheckUser';
import { UserFullInfoProvider } from '../_app';

const Index = () => {
    const [userList, setUserList] = useState([])
    const { user, user_details, isLoading: userIsLoading, isAdmin } = useContext(UserFullInfoProvider);

    const [specificId, setSpecificId] = useState("")

    const showSpecificUserMessageHandle = (id) => {
        setSpecificId(id)
    }

    const router = useRouter()
    const { inbox } = router?.query;

    useEffect(() => {
        setSpecificId(inbox)
    }, [inbox])

    //for specific user//
    const { data: userSpecific } = useQuery(['public_profile', specificId], () => axios.get(`/api/public_user_details/${specificId}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));

    const userInfo = (userSpecific?.data?.user_details);
    usePrivatePageCheckUser('/inbox')
    if (!(isAdmin?.admin || (user?.user))) {
        return <NotFound />
    }
    const { title } = PageDetailsSEO()
    return (
        <div>
            <div>
                <Head>
                    <title>
                        {
                            title
                        }
                        &nbsp;||&nbsp;Inbox ||&nbsp;
                        {
                            userInfo?.name || "User"
                        }

                    </title>
                </Head>
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