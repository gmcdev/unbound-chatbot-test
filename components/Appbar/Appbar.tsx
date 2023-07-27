import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Image from 'next/image';
import Link from 'next/link';

import { useCreateReducer } from '@/hooks/useCreateReducer';

import { savePrompts } from '@/utils/app/prompts';

import { OpenAIModels } from '@/types/openai';
import { Prompt } from '@/types/prompt';

import HomeContext from '@/pages/api/home/home.context';

import logo from '../../public/images/harder-better-faster-stronger.png';
import PromptbarContext from '../Promptbar/PromptBar.context';
import {
  PromptbarInitialState,
  initialState,
} from '../Promptbar/Promptbar.state';
import Search from '../Search';

import { useUser } from '@auth0/nextjs-auth0/client';

const Appbar = () => {
  const { t } = useTranslation('promptbar');

  /**
   * Multi-function Search input
   *
   */
  const promptBarContextValue = useCreateReducer<PromptbarInitialState>({
    initialState,
  });

  const {
    state: { prompts, defaultModelId, showPromptbar },
    dispatch: homeDispatch,
    handleCreateFolder,
  } = useContext(HomeContext);

  const {
    state: { searchTerm, filteredPrompts },
    dispatch: promptDispatch,
  } = promptBarContextValue;

  const handleSearchTerm = (searchTerm: string) => {
    // chatDispatch({ field: 'searchTerm', value: searchTerm })
  };

  // useEffect(() => {
  //   if (searchTerm) {
  //     promptDispatch({
  //       field: 'filteredPrompts',
  //       value: prompts.filter((prompt) => {
  //         const searchable =
  //           prompt.name.toLowerCase() +
  //           ' ' +
  //           prompt.description.toLowerCase() +
  //           ' ' +
  //           prompt.content.toLowerCase();
  //         return searchable.includes(searchTerm.toLowerCase());
  //       }),
  //     });
  //   } else {
  //     promptDispatch({ field: 'filteredPrompts', value: prompts });
  //   }
  // }, [searchTerm, prompts]);

  /**
   * Auth0 and User Dropdown
   *
   */
  const { user, error, isLoading } = useUser();

  // User dropdown
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef<any>(null);
  useEffect(() => {
    const closeUserDropdown = (e: MouseEvent) => {
      if (!userDropdown) {
        console.log('out');
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

  return (
    <nav className="bg-gray-900">
      <div className="max-w-full flex flex-wrap items-center justify-between pt-1">
        <a href="#" className="flex items-center w-[20%] lg:w-[260px] pl-5">
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
              searchTerm={searchTerm}
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

        <div className="flex flex-col items-end pr-[20px] text-sm w-[20%] lg:w-[260px]">
          <button type="button" className="flex">
            {user ? (
              <div
                className="w-10 h-10 rounded-full bg-contain"
                style={{ backgroundImage: `url(${user.picture})` }}
                onClick={() => setUserDropdown(!userDropdown)}
              />
            ) : (
              <Link href="/api/auth/login">Login</Link>
            )}
          </button>
          <div
            ref={dropdownRef}
            className={`absolute top-[50px] right-[10px] ${
              !userDropdown ? 'hidden' : ''
            } z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md`}
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user?.name}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {user?.email}
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
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
