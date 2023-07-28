import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { purgeAppState } from '@/utils/app/manager';

import HomeContext from '@/pages/api/home/home.context';

import logo from '../../public/images/harder-better-faster-stronger.png';
import Search from '../Search';

import { useUser } from '@auth0/nextjs-auth0/client';

const Appbar = () => {
  const { t } = useTranslation('promptbar');

  const {
    state: { appSearchTerm, user },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleSearchTerm = (value: string) => {
    homeDispatch({ field: 'appSearchTerm', value });
  };

  // USER DROPDOWN -------------------------------------------------------------

  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef<any>(null);
  useEffect(() => {
    const closeUserDropdown = (e: MouseEvent) => {
      if (!userDropdown) {
        return;
      }
      if (
        userDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        e.stopPropagation();
        setUserDropdown(false);
      }
    };
    window.addEventListener('mouseup', closeUserDropdown);
    return () => {
      window.removeEventListener('mouseup', closeUserDropdown);
    };
  }, [userDropdown, dropdownRef]);

  // logout
  const router = useRouter();
  const handleLogout = () => {
    purgeAppState();
    router.push('/api/auth/logout');
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-full max-h-[60px] flex flex-nowrap  items-center justify-between pt-1">
        <a
          href="#"
          className="flex items-center w-[20%] lg:w-[260px] pl-1 md:pl-5"
        >
          <Image
            src={logo}
            width={60}
            height={50}
            alt="Logo: Harder Better Faster Stronger"
            className="mr-3 mb-[3px]"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white hidden sm:block">
            HBFS
          </span>
        </a>

        <div className="flex justify-between grow">
          <div className="w-[100%] xl:w-[40%] ">
            <Search
              placeholder={t('Search Prompts & Conversations...') || ''}
              searchTerm={appSearchTerm}
              onSearch={handleSearchTerm}
            />
          </div>

          <div className="text-white hidden xl:block">
            <ul className="flex flex-row font-medium p-4 md:p-0">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:text-blue-600"
                >
                  ChatBot
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:text-blue-600"
                >
                  Feature2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:text-blue-600"
                >
                  Feature3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:text-blue-600"
                >
                  Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {user && (
          <div className="flex flex-col items-end pr-[20px] text-sm w-[20%] lg:w-[260px]">
            <button type="button" className="flex">
              <div
                className="w-10 h-10 rounded-full bg-contain"
                style={{ backgroundImage: `url(${user.userProfile.picture})` }}
                onClick={() => setUserDropdown(!userDropdown)}
              />
            </button>
            <div
              ref={dropdownRef}
              className={`absolute top-[50px] right-[10px] ${
                !userDropdown ? 'hidden' : ''
              } z-50 text-base list-none bg-white dark:bg-zinc-700 divide-y divide-gray-100 rounded-lg shadow-md`}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.userProfile.name}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user.userProfile.email}
                </span>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={handleLogout}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Appbar;
