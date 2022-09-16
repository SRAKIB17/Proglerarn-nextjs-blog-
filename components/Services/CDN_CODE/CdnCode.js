import React, { useContext, useState } from 'react';
import { UserFullInfoProvider } from '../../../pages/_app';
import CreateCdnCode from './CreateCdnCode';
import PublicCdnCode from './PublicCdnCode';
import UserCdnCode from './UserCdnCode';

const CdnCode = () => {
    const [cdn, setCdn] = useState('All');
    const { user, user_details } = useContext(UserFullInfoProvider)
    // usePrivatePageCheckUser('/profile');
  
    return (
        <div className='pt-2'>

            <div>
                <div>
                    <div className='flex gap-2  flex-col items-center '>
                        <div>
                            <h1 className='font-extrabold text-center text-[18px] text-primary underline'>
                                CONTENT DELIVERY NETWORK (CDN) CODE:
                            </h1>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <button
                                className={(cdn == 'All' ? 'btn-disabled bg-success text-white' : 'btn-outline') + ' btn btn-xs font-extralight btn-primary'}
                                onClick={() => setCdn('All')}
                            >
                                All
                            </button>
                            {
                                user?.user &&
                                <>
                                    <button
                                        className={(cdn == 'list' ? 'btn-disabled bg-success text-white' : 'btn-outline') + ' btn btn-xs font-extralight btn-primary'}
                                        onClick={() => setCdn('list')}
                                    >
                                        My Code
                                    </button>
                                    <button
                                        className={(cdn == 'new' ? 'btn-disabled bg-success text-white' : 'btn-outline') + ' btn btn-xs font-extralight btn-primary'}
                                        onClick={() => setCdn('new')}
                                    >
                                        New
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='pt-4'>
                    <div>
                        {
                            (user?.user && cdn === 'list') &&
                            <UserCdnCode />
                        }
                        {
                            cdn === 'All' &&
                            <PublicCdnCode />
                        }
                        {
                            (user?.user && cdn === 'new') &&
                            <CreateCdnCode props={setCdn} />
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CdnCode;