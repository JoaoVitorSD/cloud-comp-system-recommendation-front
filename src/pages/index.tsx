import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Head from "next/head";
import MusicForm from "components/musics_form";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Home({ isLoggedIn, roles }: any) {

  useEffect(() => {
  
  }, []);


  return (
    <>
      <Head>
        <title>Playlists Recommendation</title>
        <link rel="icon" href="favicon.png" />
      </Head>
      <main>
        <header>
        <h1>Spotify Playlists Recommendation</h1>
        </header>
        <MusicForm />
      </main>
      <ToastContainer/>
    </>
  )
}