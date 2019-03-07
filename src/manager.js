/* eslint react/jsx-filename-extension:off */
import React from 'react';
import addons, { types } from '@storybook/addons';

import Tool from './Tool';

import { ADDON_ID } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const register = () => {
  addons.register(ADDON_ID, api => {
    addons.add(ADDON_ID, {
      title: 'i18next / languages',
      type: types.TOOL,
      match: ({ viewMode }) => viewMode === 'story',
      render: () => <Tool api={api} />,
    });
  });
};
