import React, { Component } from 'react';

export default class App extends Component {

  static defaultProps = {
    data: 234
  }

  state = {};

  onClick = event => {
    const { clientX, clientY } = event.nativeEvent;
    this.setState({
      event: `(${clientX}), (${clientY})`,
    });
  };

  render() {
    return (
      <div className="app" onClick={this.onClick}>
        click me {this.state.event}
        <div className="app__content">content {this.props.data}</div>
      </div>
    );
  }
}
