import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Sentry from '@sentry/react-native';
import * as CodePush from 'react-native-code-push';

Sentry.init({
  dsn: 'https://1c24ab7abfd141a5a08a3ee41205ea10@o920409.ingest.sentry.io/5866010',
});
const App = () => {
  // useEffect(() => {
  //   CodePush({
  //     updateDialog: {
  //       optionalInstallButtonLabel: 'Install',
  //       optionalIgnoreButtonLabel: 'Forgot',
  //       title: 'You have new update!',
  //       optionalUpdateMessage:
  //         'New Update now, please click the button Install',
  //     },
  //     installMode: CodePush.InstallMode.IMMEDIATE,
  //     checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  //   });
  // }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.txtHello}>XIN CHAO CAC BAN</Text>
      <Text style={styles.txtHello}>
        Sentry can log err to dev when app release
      </Text>
      <TouchableOpacity
        style={styles.btnErr}
        onPress={() => {
          CodePush.checkForUpdate('M1xuoJlOYitbyYa6yjSHH5dG72i2vuX-YfR0-') // ios product key
            .then(v => {
              alert('checkupdate', v);
            })
            .catch(er => alert('checkupdate erorff', er));
        }}>
        <Text style={styles.txtBtnErr}>Check For Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHello: {
    fontSize: 15,
    color: 'red',
    marginTop: 20,
  },
  btnErr: {
    width: 200,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'blue',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  txtBtnErr: {
    color: 'white',
    fontSize: 20,
  },
});
