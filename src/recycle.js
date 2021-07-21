//__________________________

//----------------------------------------------------

// class SplashScreen extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         update: false,
//         progress: {
//           receivedBytes: 0,
//           totalBytes: 1,
//         },
//         isNeedUpdate: false,
//       };
//     }
//   ​

//   ​
//     getAppVersion = () => {
//       callAPI({
//         API: API.getAppVersion,
//         context: this,
//         typeLoading: 'dialogLoading',
//         payload: {
//           os: Platform.OS,
//           branch: 'dev',
//         },
//         onSuccess: async (res) => {},
//         onFinaly: () => {},
//         onError: (error) => {
//           console.log('error', error);
//         },
//       });
//     };
//   ​
//     async componentDidMount() {
//       Splash.hide();
//       if (__DEV__)
//         setTimeout(() => {
//           // this.getAppVersion();
//           this._bootstrapAsync();
//         }, 2500);
//       else
//         setTimeout(() => {
//           // this.getAppVersion();
//           this._checkUpdate();
//         }, 2500);
//     }
//   ​
//     async _checkUpdate() {
//       this.setState(
//         {
//           ...this.state,
//           update: true,
//         },
//         async () => {
//           codePush
//             .checkForUpdate()
//             .then((update) => {
//               this.forceNav = false;
//               this.setState({
//                 ...this.state,
//                 update: false,
//               });
//               if (!update) {
//                 this.forceNav = false;
//                 this._bootstrapAsync();
//               } else {
//                 codePush.notifyAppReady();
//                 codePush.sync(
//                   {
//                     updateDialog: null,
//                     installMode: codePush.InstallMode.IMMEDIATE,
//                   },
//                   (status) => {
//                     // reactotron.log(status);
//                     if (
//                       status == codePush.SyncStatus.DOWNLOADING_PACKAGE ||
//                       status == codePush.SyncStatus.CHECKING_FOR_UPDATE ||
//                       status == codePush.SyncStatus.SYNC_IN_PROGRESS ||
//                       status == codePush.SyncStatus.INSTALLING_UPDATE
//                     ) {
//                       this.setState({
//                         ...this.state,
//                         update: true,
//                       });
//                     } else {
//                       this.setState({
//                         ...this.state,
//                         update: false,
//                       });
//                     }
//                     if (status == codePush.SyncStatus.UPDATE_INSTALLED) {
//                       codePush.allowRestart();
//                     }
//                   },
//                   (progress) => {
//                     this.setState({
//                       progress,
//                       isNeedUpdate: true,
//                       update: false,
//                     });
//                   }
//                 );
//               }
//             })
//             .catch((err) => {
//               this.forceNav = false;
//               console.log(err.toString());
//               codePush.allowRestart();
//               this._bootstrapAsync();
//             });
//         }
//       );
//       codePush.notifyAppReady();
//     }
//   ​

//-----------------------------------------------------
