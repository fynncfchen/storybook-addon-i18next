import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Field, Select } from '@storybook/components';

import {
  LANGUAGE_CHANGED_EVENT_ID,
  CONFIGURE_EVENT_ID,
} from '../../shared';

const Container = styled.div({
  padding: 15,
  width: '100%',
  boxSizing: 'border-box',
  height: '100%',
  overflow: 'auto',
});
Container.displayName = 'Container';

class Panel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      language: null,
      languages: null,
    };

    this.configure = this.configure.bind(this);
    this.emitLanguageChanged = this.emitLanguageChanged.bind(this);
    this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
  }

  componentDidMount() {
    const { channel } = this.props;
    channel.on(CONFIGURE_EVENT_ID, this.configure);
  }

  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener(CONFIGURE_EVENT_ID, this.configure);
  }

  configure(options) {
    const { i18n, languages } = options;
    const { language } = i18n;
    this.setState({ language, languages });
  }

  emitLanguageChanged() {
    const { channel } = this.props;
    const { language } = this.state;

    channel.emit(LANGUAGE_CHANGED_EVENT_ID, language);
  }

  handleLanguageSelect(event) {
    const language = event.target.value;
    const { language: prevLang } = this.state;
    if (prevLang !== language) {
      this.setState({ language }, () => {
        this.emitLanguageChanged();
      });
    }
  }

  render() {
    const {
      active,
    } = this.props;
    const {
      language,
      languages,
    } = this.state;

    return active ? (
      <Container>
        <Field label="Language">
          <Select
            size="flex"
            value={language || ''}
            onChange={this.handleLanguageSelect}
          >
            {languages ? Object.entries(languages).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            )) : (
              <option value="" disabled>(No Languages)</option>
            )}
          </Select>
        </Field>
      </Container>
    ) : null;
  }
}

Panel.propTypes = {
  active: PropTypes.bool.isRequired,
  channel: PropTypes.shape({
    on: PropTypes.func,
    emit: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
};

export default Panel;
