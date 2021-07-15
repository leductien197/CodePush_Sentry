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
      optionalInstallButtonLabel: 'Cài đặt',
      optionalIgnoreButtonLabel: 'Bỏ qua',
      title: 'Cập nhật có sẵn',
      optionalUpdateMessage: 'Đã có bản cập nhật, bạn có muốn cài đặt nó?',
    },
    installMode: CodePush.InstallMode.IMMEDIATE,
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  })(App),
);
// AppRegistry.registerComponent(appName, () => App);
