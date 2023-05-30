import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  password: string;
}

export default function MainScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersJson = await AsyncStorage.getItem('users');
      if (usersJson) {
        const usersData: User[] = JSON.parse(usersJson);
        setUsers(usersData);
      }
    } catch (error) {
      console.log('Error fetching users', error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const updatedUsers = users.filter(user => user.id !== userId);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } catch (error) {
      console.log('Error deleting user', error);
    }
  };

  const renderUserItem = ({ item }: { item: User }) => (
  <View style={styles.userContainer} key={item.id}>
    <Text style={styles.username}>{item.username}</Text>
    <TouchableOpacity onPress={() => deleteUser(item.id)}>
      <Text style={styles.deleteButton}>Sil</Text>
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Merhaba, Kullanıcı!</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        style={styles.userList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userList: {
    flex: 1,
    marginTop: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  username: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
