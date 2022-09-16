import React from 'react';
import { MenuBarSquare, Setting } from '../../ReactRSIcon';

const SettingsAllDropdown = ({ setSettings, setContent }) => {
    return (
        <div>
            <div className="dropdown dropdown-left">
                <label tabIndex="0" className="btn btn-ghost ">
                    <div >
                        <Setting size='30' className="text-gray-500" />
                    </div>
                </label>

                <ul tabIndex="0" className="menu top-10 menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56">
                    <li>
                        <button className="" onClick={() => {
                            setSettings('Common Settings')
                            setContent('Code Highlight')
                        }}>
                            Common Settings
                        </button>
                    </li>
                    <li>
                        <button className="" onClick={() => {
                            setSettings('Post')
                            setContent('Post')
                        }}>
                            Post
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default SettingsAllDropdown;