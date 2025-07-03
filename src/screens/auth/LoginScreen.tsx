import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import FaceBookIcon from '../../assets/icons/login/facebook.svg';
import AppleIcon from '../../assets/icons/login/apple.svg';
import GmailIcon from '../../assets/icons/login/google.svg';
import NaverIcon from '../../assets/icons/login/naver.svg';
import KakaoIcon from '../../assets/icons/login/kakao.svg';

export default function LoginScreen() {
  const isIOS = Platform.OS === 'ios';
  const login = useAuthStore(state => state.login);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔐 Login Screen</Text>

      <View style={styles.socialContainer}>
        {isIOS && (
          <TouchableOpacity style={styles.iconButton} onPress={login}>
            <AppleIcon />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.iconButton} onPress={login}>
          <GmailIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={login}>
          <FaceBookIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={login}>
          <NaverIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={login}>
          <KakaoIcon />
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
    borderRadius: 10,
  },
});
