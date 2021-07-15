/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import CodePush from 'react-native-code-push';

AppRegistry.registerComponent(appName, () =>
  CodePush({
    updateDialog: {
      optionalInstallButtonLabel: 'Install',
      optionalIgnoreButtonLabel: 'Forgot',
      title: 'You have new update!',
      optionalUpdateMessage: 'New Update now, please click the button Install',
    },
    installMode: CodePush.InstallMode.IMMEDIATE,
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  })(App),
);
// AppRegistry.registerComponent(appName, () => App);
