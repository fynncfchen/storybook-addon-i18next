/* eslint react/jsx-filename-extension:off */
import React from 'react';
import addons from '@storybook/addons';

import Panel from './components/Panel';

import { ADDON_ID, PANEL_ID } from '../shared';

// eslint-disable-next-line import/prefer-default-export
export const register = () => {
  addons.register(ADDON_ID, api => {
    const channel = addons.getChannel();
    addons.addPanel(PANEL_ID, {
      title: 'i18next',
      // eslint-disable-next-line react/prop-types
      render: ({ active }) => (
        <Panel active={active} channel={channel} api={api} />
      ),
    });
  });
};
