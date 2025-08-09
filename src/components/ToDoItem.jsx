// Import React and useState for component state
import React, { useState } from 'react';
// Import icons from lucide-react
import { Check, X, Edit3, Trash2, Save } from 'lucide-react';

// ToDoItem Component
// Props:
// - todo: The task object (contains id, text, completed status, created date)
// - onToggle: Function to toggle completion status
// - onDelete: Function to delete the task
// - onEdit: Function to edit/update the task text
const ToDoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  
  // Local state: Tracks if the item is currently being edited
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state: Stores the text while editing
  const [editText, setEditText] = useState(todo.text);
  
  // Local state: Controls animation when deleting
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle save after editing
  const handleEdit = () => {
    // Only update if text is not empty and has changed
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim()); // Call parent update function
    }
    setIsEditing(false); // Exit editing mode
  };

  // Cancel editing and revert changes
  const handleCancel = () => {
    setEditText(todo.text); // Restore original text
    setIsEditing(false); // Exit editing mode
  };

  // Handle delete with small fade/scale animation
  const handleDelete = () => {
    setIsDeleting(true); // Trigger CSS opacity/scale change
    setTimeout(() => {
      onDelete(todo.id); // Actually delete after delay
    }, 200); // Matches animation duration
  };

  // Keyboard shortcuts for editing
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit(); // Save changes
    } else if (e.key === 'Escape') {
      handleCancel(); // Cancel changes
    }
  };

  return (
    <div
      className={`
        group bg-white rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-lg
        ${todo.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'}
        ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}
    >
      <div className="flex items-center gap-4">
        
        {/* Completion Toggle Button */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
            transition-all duration-200 hover:scale-110
            ${todo.completed 
              ? 'bg-green-500 border-green-500 text-white' // Completed look
              : 'border-gray-300 hover:border-blue-500' // Incomplete look
            }
          `}
        >
          {/* Show checkmark only if completed */}
          {todo.completed && <Check className="w-4 h-4" />}
        </button>

        {/* Task Content Section */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            // Edit Mode UI
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress} // Keyboard shortcuts
                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                autoFocus
              />
              {/* Save button */}
              <button
                onClick={handleEdit}
                className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              {/* Cancel button */}
              <button
                onClick={handleCancel}
                className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // Normal View Mode UI
            <div className="flex items-center justify-between">
              <span
                className={`
                  text-gray-800 transition-all duration-200
                  ${todo.completed ? 'line-through text-gray-500' : ''}
                `}
              >
                {todo.text}
              </span>
              {/* Edit & Delete buttons appear on hover */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {/* Edit button */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                {/* Delete button */}
                <button
                  onClick={handleDelete}
                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task Metadata - showing created date & time */}
      <div className="mt-2 text-xs text-gray-500 pl-10">
        Created {todo.createdAt.toLocaleDateString()} at{' '}
        {todo.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

// Export component so it can be used in other files
export default ToDoItem;
