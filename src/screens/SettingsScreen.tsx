import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { lightColors, darkColors } from '../theme/colors';

export default function SettingsScreen() {
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>⚙️ Settings</Text>
      <View style={styles.switchRow}>
        <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { fontSize: 16 },
});
