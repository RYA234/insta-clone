import Header from '../components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Feed from "../components/Feed";
import UploadModal from '../components/UploadModal';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Instageram App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
        <Header />
      {/* Feed */}
        <Feed />

      {/* Modal */}
      <UploadModal />
    </div>
  )
}