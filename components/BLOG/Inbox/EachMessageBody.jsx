/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { UserFullInfoProvider } from '../../../pages/_app';
import EachReplyOwner from './EachReplyOwner';
import EachReplyUser from './EachReplyUser';


const EachMessageBody = ({ messageBody, specificId }) => {

    const { emoji, userID, replyID, message, time } = messageBody;

    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);

    // console.log((user_one == user_details?.userID))
    //true = 4
    // false = 6



    return (
        <div>
            <div className='w-full text-sm' id='supportInboxBody'>


                {
                    (userID == user_details?.userID) ?
                        <div>
                            <EachReplyOwner
                                messageBody={messageBody}
                            />
                        </div>
                        :
                        <div className='flex flex-col'>
                            <EachReplyUser messageBody={messageBody} specificId={specificId} />
                        </div>
                }

            </div>
        </div >
    );
};


export default EachMessageBody;