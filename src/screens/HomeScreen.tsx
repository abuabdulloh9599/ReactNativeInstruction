import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { lightColors, darkColors } from '../theme/colors';
import { useTodoStore } from '../store/todoStore';

export default function HomeScreen() {
  const theme = useThemeStore(state => state.theme);
  const colors = theme === 'dark' ? darkColors : lightColors;

  const [input, setInput] = useState('');
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const removeTodo = useTodoStore(state => state.removeTodo);
  const updateTodo = useTodoStore(state => state.updateTodo);

  const handleAdd = () => {
    if (!input.trim()) return;
    addTodo(input.trim());
    setInput('');
  };

  const handleEdit = (id: string, currentText: string) => {
    Alert.prompt(
      'Edit To-Do',
      '',
      newText => {
        if (newText?.trim()) updateTodo(id, newText.trim());
      },
      undefined,
      currentText,
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>📋 To-Do List</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Add a task"
          placeholderTextColor={colors.tabInactive}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.tint },
          ]}
        />
        <Button title="Add" onPress={handleAdd} color={colors.tint} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskItem, { backgroundColor: colors.card }]}
            onPress={() => handleEdit(item.id, item.text)}
            onLongPress={() =>
              Alert.alert('Remove Task', 'Are you sure?', [
                { text: 'Cancel' },
                {
                  text: 'Delete',
                  onPress: () => removeTodo(item.id),
                  style: 'destructive',
                },
              ])
            }
          >
            <Text style={{ color: colors.text }}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  taskItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});
