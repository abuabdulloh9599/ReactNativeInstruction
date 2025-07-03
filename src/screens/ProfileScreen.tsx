import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { lightColors, darkColors } from '../theme/colors';
import { useTodoStore } from '../store/todoStore';
import { CheckCircle, Circle } from 'lucide-react-native';

export default function ProfileScreen() {
  const theme = useThemeStore(state => state.theme);
  const colors = theme === 'dark' ? darkColors : lightColors;

  const todos = useTodoStore(state => state.todos);
  const toggleDone = useTodoStore(state => state.toggleDone);
  const activeTodos = todos.filter(todo => !todo.done);
  const completedTodos = todos.filter(todo => todo.done);

  const renderItem = (item: (typeof todos)[number], index: number) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => toggleDone(item.id)}
      style={[
        styles.todoCard,
        {
          backgroundColor: colors.card,
          shadowColor: colors.text,
        },
      ]}
    >
      <View style={styles.todoRow}>
        <Text style={[styles.number, { color: colors.tabInactive }]}>
          {index + 1}.
        </Text>
        {item.done ? (
          <CheckCircle color={colors.tint} size={24} />
        ) : (
          <Circle color={colors.tabInactive} size={24} />
        )}
        <Text
          style={[
            styles.todoText,
            {
              color: colors.text,
              textDecorationLine: item.done ? 'line-through' : 'none',
              opacity: item.done ? 0.6 : 1,
            },
          ]}
        >
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        👤 Profile Screen
      </Text>

      <Text style={[styles.sectionTitle, { color: colors.tint }]}>
        🟡 Active
      </Text>
      <FlatList
        data={activeTodos}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => renderItem(item, index)}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.tabInactive }]}>
            🎉 All tasks are done!
          </Text>
        }
      />

      <Text style={[styles.sectionTitle, { color: colors.tabInactive }]}>
        ✅ Completed
      </Text>
      <FlatList
        data={completedTodos}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => renderItem(item, index)}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.tabInactive }]}>
            🕓 No completed tasks yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  todoCard: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  todoText: {
    fontSize: 16,
    flexShrink: 1,
  },
  number: {
    fontSize: 14,
    width: 24,
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10,
    opacity: 0.6,
  },
});
