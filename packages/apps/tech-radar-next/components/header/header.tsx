import styles from './header.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

import { AppBar, Link as MuiLink, Toolbar } from '@mui/material';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const router = useRouter();

  const linkMap = {
    '/': 'Home',
    '/schemas': 'Schemas',
    '/filter-words': 'Filter Words',
  };

  const links = Object.keys(linkMap).map((url) => {
    const title = linkMap[url];

    const isActive = router && router.pathname == url;

    return (
      <Link key={url} href={url}>
        <MuiLink
          sx={{ cursor: 'pointer', marginLeft: '2em' }}
          component={'a'}
          underline={isActive ? 'always' : 'none'}
        >
          {title}
        </MuiLink>
      </Link>
    );
  });

  return (
    <>
      <AppBar component={'nav'}>
        <Toolbar sx={{ justifyContent: 'space-between', display: 'flex' }}>
          <div className={styles.header__logo}>📡</div>
          <div className={styles.header__links}>{links}</div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Header;
