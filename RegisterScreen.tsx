import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import isValidCepTelefonuNumarasi from './isValidCepTelefonuNumarasi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = {
  navigate: (screen: string) => void;
};

interface Props {
  navigation: NavigationProp;
}

interface User {
  phoneNumber: string;
  username: string;
  password: string;
}

export default function RegisterScreen({ navigation }: Props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    const validation = isValidCepTelefonuNumarasi(phoneNumber);

    if (!validation.isValid) {
      Alert.alert("Geçersiz telefon numarası");
      return;
    }

    // Fetch previously saved users.
    const usersJson = await AsyncStorage.getItem('users');
    let users: User[] = [];
    if (usersJson) {
      users = JSON.parse(usersJson);
    }

    const userData: User = {
      phoneNumber: validation.formattedNumber,
      username,
      password,
    };
    users.push(userData);

    await AsyncStorage.setItem('users', JSON.stringify(users));

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı adınızı girin"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon numaranızı girin"
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifrenizi girin"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Kayıt ol" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});
