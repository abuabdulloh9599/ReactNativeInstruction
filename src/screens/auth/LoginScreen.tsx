import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Apple, Mail } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  const isIOS = Platform.OS === 'ios';
  const login = useAuthStore(state => state.login);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔐 Login Screen</Text>

      <View style={styles.socialContainer}>
        {isIOS && (
          <TouchableOpacity style={styles.iconButton} onPress={login}>
            <Apple size={28} color="#000" />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.iconButton} onPress={login}>
          <Mail size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  iconButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
});
