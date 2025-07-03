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
  Modal,
} from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { lightColors, darkColors } from '../theme/colors';
import { useTodoStore } from '../store/todoStore';

export default function HomeScreen() {
  const theme = useThemeStore(state => state.theme);
  const colors = theme === 'dark' ? darkColors : lightColors;

  const [input, setInput] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

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
    setEditId(id);
    setEditText(currentText);
    setModalVisible(true);
  };

  const confirmEdit = () => {
    if (editId && editText.trim()) {
      updateTodo(editId, editText.trim());
      setEditId(null);
      setEditText('');
      setModalVisible(false);
    }
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
        <TouchableOpacity
          onPress={handleAdd}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 20,
            backgroundColor: colors.tint,
          }}
        >
          <Text style={{ color: colors.text }}>Add</Text>
        </TouchableOpacity>
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

      {/* Edit Modal */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.editLabel, { color: colors.text }]}>
              Edit Task
            </Text>
            <TextInput
              value={editText}
              onChangeText={setEditText}
              style={[
                styles.input,
                styles.modalInput,
                { color: colors.text, borderColor: colors.tint },
              ]}
              placeholder="Edit task"
              placeholderTextColor={colors.tabInactive}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={confirmEdit} color={colors.tint} />
            </View>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 20,
  },
  taskItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 30,
  },
  modalBox: {
    borderRadius: 10,
    padding: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  editLabel: {
    marginBottom: 8,
  },
  modalInput: {
    fontSize: 18,
    height: 48,
  },
});
