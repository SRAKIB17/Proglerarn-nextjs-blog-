import React, { useContext } from 'react';
import { UserFullInfoProvider } from '../../pages/_app';
import LoadingSpin from '../LoadingSpin';
import { FacebookSquare, Github, Youtube, LinkedinNew, Instagram, Twitter, TwitterSquare, Quote, Gender, School, Location, Worker } from '../ReactRSIcon/index';


const About = ({ props }) => {
    const { isLoadingAbout, user_details } = props
    // const { user, user_details, isLoading } = useContext(UserFullInfoProvider)
  

    if (isLoadingAbout) {
        return (
            <div className='p-5'>
                <LoadingSpin />
            </div>
        )
    }
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
                        <td className='flex items-center gap-1'>
                            <Github />
                            <a className='link-hover link-primary' href={user_details?.github}>{user_details?.github}</a>
                        </td>
                    </tr>

                    <tr>
                        <td className='flex items-center gap-1'>
                            <Youtube />
                            <a className='link-hover link-primary' href={user_details?.youtube}>{user_details?.youtube}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className='flex items-center gap-1'>
                            <FacebookSquare className='rounded-sm' />
                            <a className='link-hover link-primary' href={user_details?.facebook}>{user_details?.facebook}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className='flex items-center gap-1'>
                            <LinkedinNew />
                            <a className='link-hover link-primary' href={user_details?.linkedin}>{user_details?.linkedin}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className='flex items-center gap-1'>
                            <Instagram />
                            <a className='link-hover link-primary' href={user_details?.instagram}>{user_details?.instagram}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className='flex items-center gap-1'>
                            <Twitter />
                            <a className='link-hover link-primary' href={user_details?.twitter}>{user_details?.twitter}</a>
                        </td>
                    </tr>
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
            <p className='text-sm font-mono text-justify'>
                {
                    user_details?.quote
                }
            </p>
            {/* <button >See More</button> */}
        </div>
    );
};

export default About;