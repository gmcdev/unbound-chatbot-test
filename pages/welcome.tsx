import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/images/harder-better-faster-stronger.png';

const Welcome = () => {
  return (
    <div>
      <Head>
        <title>Chatbot UI</title>
        <meta name="description" content="ChatGPT but better." />
        <meta
          name="viewport"
          content="height=device-height ,width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-auto max-w-md h-[85vh] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center m-12">
            <Image
              src={logo}
              width={120}
              height={100}
              alt="Logo: Harder Better Faster Stronger"
              className="mr-3 mb-[3px]"
            />
            <div className="text-3xl font-semibold whitespace-nowrap text-white hidden sm:block">
              HBFS
            </div>
          </div>
          <div className="text-white m-4">
            Wecome! Please login to get started~
          </div>
          <Link
            className="text-center w-[190px] m-2 cursor-pointer select-none items-center gap-3 rounded-md border border-white/20 p-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
            href="/api/auth/login"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
};
export default Welcome;
