/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () =>
//   CodePush({
//     updateDialog: {
//       optionalInstallButtonLabel: 'Cập Nhập',
//       optionalIgnoreButtonLabel: 'Bỏ Qua',
//       title: 'You have new update!',
//       optionalUpdateMessage: 'New Update now, please click the button Install',
//     },
//     installMode: CodePush.InstallMode.IMMEDIATE,
//     checkFrequency:
//       CodePush.CheckFrequency.ON_APP_START ||
//       CodePush.CheckFrequency.ON_APP_RESUME,
//   })(App),
// );
AppRegistry.registerComponent(appName, () => App);
