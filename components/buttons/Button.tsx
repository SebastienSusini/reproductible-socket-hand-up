/* eslint-disable unused-imports/no-unused-vars */
import * as React from 'react';

import type { LinkProps } from 'next/link';
import Link from 'next/link';

import { CogIcon as SpinnerIcon } from '@heroicons/react/outline';

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  styleType: 'primary' | 'secondary';
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as: 'button';
    loading?: {
      isLoading: boolean;
      loadingText: string;
      colorClass?: string;
    };
  };

type ButtonAsUnstyled = Omit<ButtonAsButton, 'as' | 'styleType'> & {
  as: 'unstyled';
  styleType?: BaseProps['styleType'];
  loading?: {
    isLoading: boolean;
    loadingText: string;
    colorClass?: string;
  };
};

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: 'link';
  };

type ButtonAsExternal = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'externalLink';
    externalHref: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsExternal | ButtonAsLink | ButtonAsUnstyled;

const Button = (props: ButtonProps): JSX.Element => {
  const allClassNames = `${props.styleType ? props.styleType : ''} ${
    props.className ? props.className : ''
  }`;

  if (props.as === 'link') {
    const { className, styleType, as, ...rest } = props;
    return (
      <Link {...rest}>
        <a className={allClassNames}>{props.children}</a>
      </Link>
    );
  }

  if (props.as === 'externalLink') {
    const { styleType, externalHref, ...rest } = props;
    return (
      <a
        className={allClassNames}
        target="_blank"
        rel="noopener noreferrer"
        href={externalHref}
        {...rest}
      >
        {props.children}
      </a>
    );
  }

  if (props.as === 'unstyled') {
    const { className, styleType, as, ...rest } = props;
    return (
      <button className={className} {...rest}>
        {props.loading?.isLoading ? (
          <>
            <SpinnerIcon  /> {props.loading.loadingText}
          </>
        ) : (
          props.children
        )}
      </button>
    );
  }

  const { className, styleType, as, loading, ...rest } = props;
  return (
    <button className={allClassNames} {...rest}>
      {props.loading?.isLoading ? (
        <>
          <SpinnerIcon /> {props.loading.loadingText}
        </>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
