"use client";

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash, Plus, Pencil, Save, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// Custom hook for localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('onekit-todos', []);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };
  
  const saveEdit = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: editingText } : todo)));
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <Button type="submit">
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </form>
      <Card>
        <CardContent className="p-0">
          <div className="space-y-2 p-4">
            {todos.length > 0 ? (
              todos.map(todo => (
                <div key={todo.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`}
                  />
                  {editingId === todo.id ? (
                    <Input value={editingText} onChange={(e) => setEditingText(e.target.value)} className="flex-grow h-8" />
                  ) : (
                    <label htmlFor={`todo-${todo.id}`} className={`flex-grow cursor-pointer ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.text}
                    </label>
                  )}
                  <div className="flex gap-1">
                    {editingId === todo.id ? (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => saveEdit(todo.id)}><Save className="h-4 w-4 text-green-500" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                      </>
                    ) : (
                      <Button variant="ghost" size="icon" onClick={() => startEditing(todo)}><Pencil className="h-4 w-4" /></Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}><Trash className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground p-4">No tasks yet. Add one to get started!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
