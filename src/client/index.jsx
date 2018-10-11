import React from 'react';
import {render} from 'react-dom';
import { Provider } from "react-redux";
import { configureStore } from "../common/store/configureStore";


import App from '../common/components/landing/App';

import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

import 'react-dates/lib/css/_datepicker.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-notifications/dist/react-notifications.css';

require('./assets/css/style.css');


ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme({
  reactDates: {
    ...DefaultTheme.reactDates,
    spacing: {
      captionPaddingTop: 22,
      captionPaddingBottom: 37,
      inputPadding: 3,
      inputMarginBottom: 40,
      displayTextPaddingVertical: 5,
      displayTextPaddingHorizontal: 12,
    },

    sizing: {
      inputWidth: 130,
      tooltipArrowWidth: 20,
      arrowWidth: 24,
    },

    font: {
      size: '1em',
      captionSize: '1em',
      input: {
        size: '1em',
        lineHeight: '24px',
        styleDisabled: 'italic',
      },
    }
  }
});

let store = configureStore({});
render(
  <div style={{ height: "100%" }}>
    <Provider store={store}><App/></Provider>
  </div>, document.getElementById('app'));
