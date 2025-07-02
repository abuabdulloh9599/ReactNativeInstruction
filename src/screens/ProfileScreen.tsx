import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { lightColors, darkColors } from '../theme/colors';

export default function ProfileScreen() {
  const theme = useThemeStore(state => state.theme);
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        👤 Profile Screen
      </Text>
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
  },
});
