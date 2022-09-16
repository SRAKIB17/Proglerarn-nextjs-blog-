import React, { useContext } from 'react';
import { Gender, Location, Quote, School, Worker } from '../../ReactRSIcon';


const AboutUser = ({ user_details }) => {



    return (
        <div className='p-1'>

            <table className='table-auto'>
                <tbody>
                    <tr>
                        <td className='flex items-center gap-1'> <Worker />{user_details?.work}</td>
                    </tr>
                    <tr>
                        <td className='flex items-center gap-1'> <Location />{user_details?.location} </td>
                    </tr>
                    <tr>
                        <td className='flex items-center gap-1'><School /> {user_details?.school}</td>
                    </tr>
                    {/* <tr>
                    <td><img src={relationship} alt="" /> Single</td>
                </tr> */}
                    {/* <tr>
                    <td><img src={birthday} alt="" /> Birthday</td>
                </tr> */}

                    <tr>
                        <td className='flex items-center gap-1'><Gender /> {user_details?.gender}</td>
                    </tr>
                    {/* <tr>
                    <td> <img src={religion} alt="" /> riligion</td>
                </tr> */}
                    <tr>
                        <td className='flex items-center gap-1'><Quote /> About:
                        </td>

                    </tr>
                </tbody>

            </table>
            <p className='text-sm font-mono text-justify ml-4 mr-4'>
                {
                    user_details?.quote
                }
            </p>
            {/* <button >See More</button> */}
        </div>
    );
};

export default AboutUser;