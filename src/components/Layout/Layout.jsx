import React from 'react';
import '../../styles/main.scss';

import ContactLayout from './ContactLayout';
import MainPageLayout from './MainPageLayout';
import SearchContactsLayout from './SearchContactsLayout';
import SearchContactsEmptyLayout from './SearchContactsEmptyLayout';
import TabSelectedLayout from './TabSelectedLayout';

// A component for presentation all the possible HTML-views of the application.
const Layout = () => {
  return (
    <div>
      <MainPageLayout />

      <hr />

      <TabSelectedLayout />

      <hr />

      <SearchContactsLayout />

      <hr />

      <SearchContactsEmptyLayout />

      <hr />

      <div
        style={{ position: 'relative', height: 'calc(var(--vh, 1vh) * 100)' }}
      >
        <ContactLayout />
      </div>
    </div>
  );
};

export default Layout;
