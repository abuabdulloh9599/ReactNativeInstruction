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

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
    setModalVisible(false);
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
            {
              color: colors.text,
              borderColor: colors.tint,
              backgroundColor: colors.card,
            },
          ]}
        />
        <TouchableOpacity
          onPress={handleAdd}
          style={[styles.addButton, { backgroundColor: colors.tint }]}
        >
          <Text style={{ color: colors.background, fontWeight: '600' }}>
            Add
          </Text>
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
                {
                  color: colors.text,
                  borderColor: colors.tint,
                  backgroundColor:
                    theme === 'dark' ? colors.background : colors.card,
                  // Ensure text is always visible
                  textAlignVertical: 'center',
                },
              ]}
              placeholder="Edit task"
              placeholderTextColor={colors.tabInactive}
              autoFocus={true}
              selectTextOnFocus={true}
              multiline={false}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={cancelEdit}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmEdit}
                style={[styles.modalButton, { backgroundColor: colors.tint }]}
              >
                <Text style={[styles.buttonText, { color: colors.background }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
  },
  addButton: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 30,
  },
  modalBox: {
    borderRadius: 12,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  editLabel: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  modalInput: {
    fontSize: 12,
    minHeight: 48,
    marginBottom: 8,
  },
});
