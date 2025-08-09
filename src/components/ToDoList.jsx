import React from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react'; // Icons from lucide-react for visual cues
import ToDoItem from './ToDoItem'; // Import our reusable single todo component

/**
 * ToDoList Component
 * ------------------
 * Responsible for rendering the full list of todos, split into "Pending" and "Completed" sections.
 * Accepts a list of todo objects and event handlers for toggling, deleting, and editing.
 */
const ToDoList = ({ todos, onToggle, onDelete, onEdit }) => {
  /**
   * STEP 1 — Handle empty state
   * If there are no todos at all, we display a friendly placeholder instead of an empty UI.
   */
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        {/* Icon container */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ListTodo className="w-8 h-8 text-gray-400" /> {/* Gray "list" icon */}
          </div>
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No tasks yet
          </h3>
          {/* Subtitle / Instruction */}
          <p className="text-gray-600">
            Add your first task above to get started!
          </p>
        </div>
      </div>
    );
  }

  /**
   * STEP 2 — Split todos into "pending" and "completed"
   * We use Array.filter to separate them for display purposes.
   */
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  /**
   * STEP 3 — Render the two sections
   * - Pending section shows tasks not completed
   * - Completed section shows finished tasks
   */
  return (
    <div className="space-y-6"> {/* Vertical gap between sections */}

      {/* ---------- Pending Tasks Section ---------- */}
      {pendingTodos.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            {/* Blue icon background */}
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-blue-600" /> {/* Blue "list" icon */}
            </div>
            {/* Header text with count */}
            <h2 className="text-xl font-semibold text-gray-800">
              Pending Tasks ({pendingTodos.length})
            </h2>
          </div>

          {/* The actual list of pending ToDoItem components */}
          <div className="space-y-3">
            {pendingTodos.map((todo) => (
              <ToDoItem
                key={todo.id}     // Unique key for React list rendering
                todo={todo}       // The todo object itself
                onToggle={onToggle} // Handler for marking complete/incomplete
                onDelete={onDelete} // Handler for removing the todo
                onEdit={onEdit}     // Handler for editing the todo text
              />
            ))}
          </div>
        </div>
      )}

      {/* ---------- Completed Tasks Section ---------- */}
      {completedTodos.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            {/* Green icon background */}
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" /> {/* Green check icon */}
            </div>
            {/* Header text with count */}
            <h2 className="text-xl font-semibold text-gray-800">
              Completed Tasks ({completedTodos.length})
            </h2>
          </div>

          {/* The actual list of completed ToDoItem components */}
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <ToDoItem
                key={todo.id}     // Unique key for React list rendering
                todo={todo}       // The todo object itself
                onToggle={onToggle} // Handler for marking complete/incomplete
                onDelete={onDelete} // Handler for removing the todo
                onEdit={onEdit}     // Handler for editing the todo text
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
