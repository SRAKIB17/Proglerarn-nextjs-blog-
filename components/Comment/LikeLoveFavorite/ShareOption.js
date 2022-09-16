import { useRouter } from 'next/router';
import React from 'react';
import { Email, Facebook, FacebookSquare, Google, LinkedinSquare, Printer, SkypeSquare } from '../../ReactRSIcon';

const ShareOption = ({ id, sharePath }) => {
    const checkPath = sharePath?.includes('cdn')
    const router = useRouter()
    const pushShareUrlHandle = (url) => {
        if (url === 'linkedin') {

            router.push(
                `http://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}/${sharePath}&title=${id}&summary=some%20summary%20if%20you%20want&source=${window.location.origin}`
            )
        }
        else if (url === 'facebook') {
            router.push(
                `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/${sharePath}`
            )
        }
        else if (url === 'skype') {
            router.push(
                `https://web.skype.com/share?u=${window.location.origin}/${sharePath}`
            )
        }
        else if (url === 'email') {
            const url = `mailto:?subject=I wanted you to see this site&body=Check out this site ${window.location.origin}/${sharePath} `
            router.push(url)

        }
        else if (url === 'print') {
            const url =
                router.push(url)
            router.prefetch(url)

        }
        else {
            router.push(url)
        }
    }
    return (
        <div>
            <div className='absolute top-[-1px] z-30 bg-base-300 shadow-md  right-0 p-3 pb-2 rounded-md'>
                <div className='flex gap-1 '>
                    <div>
                        <button onClick={() => pushShareUrlHandle('linkedin', sharePath)}>
                            <LinkedinSquare size='20' className="rounded-sm text-[#2386ff] hover:text-[#1B74E4]" />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => pushShareUrlHandle('facebook', sharePath)}>
                            <FacebookSquare size='20' className="rounded-sm text-[#4699ff] hover:text-[#1B74E4]" />
                        </button>
                    </div>

                    <div>
                        <button onClick={() => pushShareUrlHandle('skype', sharePath)}>
                            <SkypeSquare size='20' className="rounded-sm text-[#2bc6ff] hover:text-[#00AFF0]" />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => pushShareUrlHandle('email', sharePath)}>
                            <Email size='22' className="rounded-sm text-[#ff0000] hover:text-[#ff5555]" />
                        </button>
                    </div>
                    {
                        checkPath ||
                        <div>
                            <a href={'/print/' + id} target="_blank" rel="noreferrer">
                                <Printer size='22' className="rounded-sm text-[#00ff33] hover:text-[#ff5555]" />
                            </a>
                        </div>
                    }
                </div>
            </div >
        </div>
    );
};

export default ShareOption;