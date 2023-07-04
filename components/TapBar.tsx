import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ChipIcon, CogIcon, LoginIcon, SearchIcon, TicketIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

import useEventListener from '../hooks/useEventListener';

import { makeCallbackUrl } from '../utils/helpers/common';

interface Props {
  shortCurrentUser: any;
  isArtist: boolean | null;
  hasNotifications: boolean;
}

const TapBar = ({ shortCurrentUser, isArtist, hasNotifications }: Props) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const isHome = router.pathname === '/';
  const isSignUp = router.pathname === '/auth/signup';
  const isSong = router.pathname === '/songs/[slug]';
  const isUserSong =
    router.pathname.startsWith('/users/[slug]/songs') ||
    router.pathname.startsWith('/users/dashboard/songs');
  const isUserFanTokens =
    router.pathname.startsWith('/users/[slug]/tokens') ||
    router.pathname.startsWith('/users/dashboard/tokens');

  const activeClass = (path: string) =>
    path === router.pathname ? 'text-skyblue-600 font-medium' : 'text-skyblue-500';

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 30 && currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEventListener('scroll', handleScroll);

  if (isHome) return null;

  return (
    <nav
      className={clsx(
        'fixed inset-x-0 bottom-0 z-40 flex h-auto w-full items-center justify-between overflow-hidden rounded-t-md bg-white pb-4 pt-3 shadow-md shadow-black transition-all duration-[400ms] ease-in-out md:hidden',
        {
          'px-7': isArtist,
          'px-8': !isArtist,
          'bottom-[-100px]': isHidden,
          'hidden ': isHome || isSong || isUserSong || isUserFanTokens,
        }
      )}
    >
      <div
        className={clsx('relative w-auto cursor-pointer text-center', {
          '': isArtist,
          'min-w-[61.31px]': !isArtist,
        })}
      >
        <Link href="/feed">
          <a
            className={clsx('text-sm', {
              'text-skyblue-600 font-medium': router.pathname === '/feed',
              'text-skyblue-500': router.pathname !== '/feed',
            })}
          >
            <CogIcon className="mx-auto h-6 w-6" />
            <div>Feed</div>
          </a>
        </Link>
        <span
          className={clsx('absolute right-1 top-0 flex h-2 w-2', {
            hidden: !hasNotifications,
            flex: hasNotifications,
          })}
        >
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
        </span>
      </div>

      <div className="w-auto cursor-pointer text-center">
        <Link href="/discover">
          <a className={`text-sm ${activeClass('/discover')}`}>
            <SearchIcon className="mx-auto h-6 w-6" />
            <div>{t('discover')}</div>
          </a>
        </Link>
      </div>
      {isArtist && (
        <div className="w-auto cursor-pointer text-center">
          <Link href="/artists/backstage">
            <a className={`text-sm ${activeClass('/artists/backstage')}`}>
              <TicketIcon className="mx-auto h-6 w-6" />
              <div>Backstage</div>
            </a>
          </Link>
        </div>
      )}
      <div className="w-auto cursor-pointer text-center">
        {shortCurrentUser ? (
          <Link href="/users/dashboard">
            <a className={`text-sm ${activeClass('/users/dashboard')}`}>
              <ChipIcon className="m-auto h-6 w-6" />
              <div>Dashboard</div>
            </a>
          </Link>
        ) : (
          <Link
            href={{
              pathname: isSignUp ? '/auth/login' : '/auth/signup',
              query: makeCallbackUrl(router),
            }}
          >
            <a className={`text-sm ${activeClass(isSignUp ? '/auth/login' : '/auth/signup')}`}>
              <LoginIcon className="mx-auto h-6 w-6" />
              <div>{isSignUp ? t('signIn') : t('signUp')}</div>
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TapBar;
