import '../styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient();


import { useState, createContext } from 'react'
import useUserCheck from '../components/hooks/checkUser/useUserCheck';
import HeaderBlog from '../components/BLOG/Header/HeaderBlog';
import Footer from '../components/BLOG/Footer/Footer';
import Head from 'next/head';

export const UserFullInfoProvider = createContext()
function MyApp({ Component, pageProps }) {
  const { user, user_details, isAdmin, isLoading } = useUserCheck()
  return (
    <UserFullInfoProvider.Provider value={{ user, user_details, isAdmin, isLoading }}>
      <QueryClientProvider client={queryClient}>

        <div className='bg-base-100'>
          <div>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderBlog />
          </div>
          <div className='sm:p-4 md:pr-4 md:pl-4 xl:pr-28 xl:pl-28'>
            <Component {...pageProps} />
          </div>
          <div>
            {/* <Footer /> */}
          </div>
        </div>
      </QueryClientProvider>
    </UserFullInfoProvider.Provider>
  )
}



export default MyApp
