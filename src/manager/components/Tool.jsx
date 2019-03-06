import React from 'react';
import PropTypes from 'prop-types';

import { Icons, IconButton } from '@storybook/components';
import { SET_STORIES } from '@storybook/core-events';

class I18NextTool extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   selected: null,
    // };

    this.listener = () => {
      // this.setState({
      //   selected: null,
      // });
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

  render() {
    return (
      <>
        <IconButton key="i18next" title="Change the language">
          <Icons icon="globe" />
        </IconButton>
      </>
    );
  }
}

I18NextTool.propTypes = {
  api: PropTypes.shape({
    on: PropTypes.func,
    off: PropTypes.func,
  }).isRequired,
};

export default I18NextTool;
