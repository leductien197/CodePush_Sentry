import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const App = () => {
  // useEffect(() => {
  //   codePush.sync({
  //     updateDialog: true,
  //     installMode: codePush.InstallMode.IMMEDIATE,
  //   });
  // }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.txtHello}>XIN CHAO CAC BAN</Text>
      <Text style={styles.txtHello}>
        Sentry can log err to dev when app release
      </Text>
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
});
