import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './index';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  render() {
    return (
      this.state.hasError
        ? (
          <div>
            Error
        </div>
        )
        : (
          <BrowserRouter>
            <Route path="/login">
              <Main {...this.props} />
            </Route>
          </BrowserRouter>
        )
    );
  }
}
