/* eslint react/jsx-filename-extension:off */
import React from 'react';
import PropTypes from 'prop-types';
import addons, { makeDecorator } from '@storybook/addons';
import { I18nextProvider, withNamespaces } from 'react-i18next';

import {
  CONFIGURE_EVENT_ID,
  LANGUAGE_CHANGED_EVENT_ID,
} from '../shared';

class Wrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  componentDidMount() {
    const { channel } = this.props;
    channel.on(LANGUAGE_CHANGED_EVENT_ID, this.changeLanguage);
  }

  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener(LANGUAGE_CHANGED_EVENT_ID, this.changeLanguage);
  }

  changeLanguage(language) {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
  }

  render() {
    const { story, i18n } = this.props;
    return (
      <I18nextProvider i18n={i18n}>
        {story}
      </I18nextProvider>
    );
  }
}

Wrapper.propTypes = {
  story: PropTypes.node.isRequired,
  channel: PropTypes.shape({
    on: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func,
  }).isRequired,
};

const withI18next = makeDecorator({
  name: 'withI18next',
  wrapper: (getStory, context, { options }) => {
    const channel = addons.getChannel();
    const { i18n } = options;
    channel.emit(CONFIGURE_EVENT_ID, options);
    return <Wrapper channel={channel} story={getStory(context)} i18n={i18n} />;
  },
});

export {
  withI18next,
  withNamespaces,
};
