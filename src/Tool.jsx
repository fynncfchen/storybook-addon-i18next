import React from 'react';
import PropTypes from 'prop-types';

import {
  Icons,
  IconButton,
  WithTooltipPure,
  TooltipLinkList,
} from '@storybook/components';
import { SET_STORIES } from '@storybook/core-events';

import { CONFIGURE_EVENT_ID, LANGUAGE_CHANGED_EVENT_ID } from './constants';

class I18NextTool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipExpanded: false,
      language: null,
      languages: null,
    };

    this.configure = this.configure.bind(this);
    this.emitLanguageChanged = this.emitLanguageChanged.bind(this);
    this.handleLanguageClick = this.handleLanguageClick.bind(this);

    this.listener = () => {
      const { api } = this.props;
      api.on(CONFIGURE_EVENT_ID, this.configure);
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api.on(SET_STORIES, this.listener);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off(SET_STORIES, this.listener);
  }

  configure(options) {
    const { i18n, languages } = options;
    const { language } = i18n;
    this.setState({ language, languages });
  }

  emitLanguageChanged() {
    const { api } = this.props;
    const { language } = this.state;
    api.emit(LANGUAGE_CHANGED_EVENT_ID, language);
  }

  handleLanguageClick(event) {
    const { dataset: { value } = {} } = event.currentTarget;
    this.setState({ isTooltipExpanded: false, language: value }, () => {
      this.emitLanguageChanged();
    });
  }

  render() {
    const { isTooltipExpanded, languages } = this.state;

    const items = Object.entries(languages || {}).map(([key, name]) => ({
      id: key,
      title: name,
      onClick: this.handleLanguageClick,
      'data-value': key,
    }));

    return (
      <WithTooltipPure
        placement="top"
        trigger="click"
        tooltipShown={isTooltipExpanded}
        onVisibilityChange={t => this.setState({ isTooltipExpanded: t })}
        tooltip={<TooltipLinkList links={items} />}
        closeOnClick
      >
        <IconButton key="i18next" title="Change the language">
          <Icons icon="globe" />
        </IconButton>
      </WithTooltipPure>
    );
  }
}

I18NextTool.propTypes = {
  api: PropTypes.shape({
    on: PropTypes.func,
    off: PropTypes.func,
    emit: PropTypes.func,
  }).isRequired,
};

export default I18NextTool;
