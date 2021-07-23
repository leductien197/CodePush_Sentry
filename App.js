import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableNativeFeedback,
} from 'react-native';
import * as Sentry from '@sentry/react-native';
import CodePush from 'react-native-code-push';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-simple-toast';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

Sentry.init({
  dsn: 'https://1c24ab7abfd141a5a08a3ee41205ea10@o920409.ingest.sentry.io/5866010',
});

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

const App = () => {
  const toastRef = useRef();
  // ________down_to_code_push___________
  const [isUpdate, setIsUpdate] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [updateInfo, setUpdateInfo] = useState({});
  const [isMandatory, setIsMandatory] = useState(false);

  useEffect(() => {
    CodePush.notifyAppReady();
    check();
  }, []);
  const check = () => {
    CodePush.checkForUpdate().then(async update => {
      if (!update || update.failedInstall) {
        // __
      } else {
        setModalVisible(true);
        setUpdateInfo(update);
        setIsMandatory(update.isMandatory);
      }
    });
  };

  // ham update version
  const update = async () => {
    setIsUpdate(true);
    CodePush.sync(
      {
        updateDialog: false,
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  };

  // ham cancle modal
  const onCancel = () => {
    setModalVisible(false);
  };

  // ham trang thai download
  const codePushStatusDidChange = syncStatus => {
    console.log('syncStatus', syncStatus);
    if (isUpdate) {
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('Checking for update');
          setSyncMessage('Checking for update');
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('DOWNLOADING_PACKAGE');
          setSyncMessage('Downloading package');
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          console.log('AWAITING_USER_ACTION');
          setSyncMessage('Awaiting user action');
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          console.log('INSTALLING_UPDATE');
          setSyncMessage('Installing update');
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          console.log('UP_TO_DATE');
          setSyncMessage('App up to date.');
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          console.log('UPDATE_IGNORED');
          setSyncMessage('Update cancelled by user');
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          console.log('UPDATE_INSTALLED');
          setSyncMessage('Update installed and will be applied on restart.');
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          setSyncMessage('An unknown error occurred');
          Toast.show('Update error, please restart the application! ');
          // toastRef.current.show(
          //   'Update error, please restart the application! ',
          // );
          setModalVisible(false);
          break;
      }
    }
  };

  // ham tinh toan progress
  const codePushDownloadDidProgress = progress => {
    console.log('progress----1', progress);
    let currProgress =
      Math.round((progress.receivedBytes / progress.totalBytes) * 100) / 100;
    console.log('currProgress,', currProgress);
    setProgress(currProgress);
    if (currProgress == 100) {
      setModalVisible(false);
    }
  };

  console.log('modalVisible', modalVisible);
  return (
    <SafeAreaView>
      <View style={styles.viewTest}>
        <Text style={[styles.title, {color: 'blue'}]}>
          Girl: Surprise mother father !!!
        </Text>
      </View>
      <Modal animationType={'none'} transparent={true} visible={modalVisible}>
        <View style={styles.content}>
          {!isUpdate ? (
            <View style={styles.contentArea}>
              <Text style={[styles.header, {color: 'red'}]}>
                New version found
              </Text>
              <View style={styles.updateDes}>
                <Text style={styles.title}>Version: {updateInfo?.label}</Text>
                <Text style={[styles.description, {color: 'blue'}]}>
                  Package Size: {updateInfo?.packageSize}kb
                </Text>
              </View>
              {/* button to determine whether to force an update */}
              {isMandatory ? (
                <View style={styles.buttonArea}>
                  <TouchableOpacity onPress={() => update()}>
                    <View style={[styles.button, {backgroundColor: 'red'}]}>
                      <Text style={styles.buttonText}>Update</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonsArea}>
                  <TouchableOpacity onPress={() => onCancel()}>
                    <View style={[styles.buttons, {backgroundColor: 'gray'}]}>
                      <Text style={[styles.buttonText]}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => update()}>
                    <View style={[styles.buttons, {backgroundColor: 'green'}]}>
                      <Text style={styles.buttonText}>Update</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.contentArea}>
              <Text style={[styles.header, {color: 'red'}]}>
                Updating download,Please wait
              </Text>
              <Progress.Circle
                animated={true}
                progress={progress}
                indeterminate={false}
                style={{alignSelf: 'center', paddingBottom: 10}}
                size={70}
                showsText={true}
                // endAngle={0.9}
                // borderWidth={4}
              />
            </View>
          )}
          {/* <Toast ref={toastRef} /> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CodePush(codePushOptions)(App);
const styles = StyleSheet.create({
  viewTest: {
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  contentArea: {
    // height:400,
    width: 300,
    backgroundColor: 'yellow',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  header: {
    width: 300,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  updateDes: {
    width: 300,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  buttonArea: {
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    lineHeight: 40,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonsArea: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttons: {
    width: 105,
    height: 40,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  progress: {
    height: 20,
    width: 200,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
  },
});
