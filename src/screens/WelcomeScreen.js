import * as React from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';

export const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Geotracking App!</Text>
      <Button
        title={'Open You Route!'}
        onPress={() => {
          navigation.navigate('Route');
        }}
      >
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
