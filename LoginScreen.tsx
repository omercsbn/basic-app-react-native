import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TextInput, Alert, Animated, Image } from 'react-native';
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

export default function LoginScreen({ navigation }: Props) {
  const [usernameOrPhoneNumber, setUsernameOrPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersJson = await AsyncStorage.getItem('users');
      if (usersJson) {
        const usersData: User[] = JSON.parse(usersJson);
        setUsers(usersData);
      }
    };

    fetchUsers();
  }, []);

  const login = () => {
    const user = users.find(
      user => (user.username === usernameOrPhoneNumber || user.phoneNumber === usernameOrPhoneNumber) && user.password === password
    );

    if (user) {
      navigation.navigate('Main');
    } else {
      Alert.alert("Hatalı kullanıcı adı, telefon numarası veya şifre");
    }
  };

    const fadeAnim = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
      />
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı adınızı veya telefon numaranızı girin"
        onChangeText={setUsernameOrPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifrenizi girin"
        secureTextEntry
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Giriş Yap" onPress={login} />
      </View>
      <Button title="Kayıtlı değil misiniz?" onPress={() => navigation.navigate('Register')} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    height: 112,
    width: 186,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
});