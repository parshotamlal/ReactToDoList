// Importing necessary modules and icons
import React, { useState } from 'react'; // useState is used for local state management
import { Plus, CheckCircle2, Clock } from 'lucide-react'; // Icons from lucide-react library

// Header Component
// Props:
// - totalTasks: number of all tasks
// - completedTasks: number of completed tasks
// - onAddTask function to add a new task:
const Header = ({ totalTasks, completedTasks, onAddTask }) => {
  
  // State to store the text entered in the input field
  const [inputValue, setInputValue] = useState('');
  
  // State to show an animation when a task is being added
  const [isAdding, setIsAdding] = useState(false);

  // Function to handle form submission (when "Add Task" button is pressed)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload after form submit
    if (inputValue.trim()) { // Only run if input is not empty
      setIsAdding(true); // Start adding animation
      onAddTask(inputValue.trim()); // Call parent function to actually add the task
      
      setInputValue(''); // Clear input field
      // Stop animation after 200ms
      setTimeout(() => setIsAdding(false), 200);
    }
  };

  // Calculate pending tasks
  const pendingTasks = totalTasks - completedTasks;
  

  // Calculate completion percentage (only if there are tasks)
  const completionPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100) // Round to nearest integer
    : 0; // If no tasks, percentage is 0

  return (

    // Main container for the header section
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      

      {/* Title and Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Task Manager {/* Main heading */}
        </h1>
        <p className="text-gray-600">
          Stay organized and productive {/* Subheading */}
        </p>
      </div>


      {/* Task Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        {/* Total Tasks Box */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-800">{totalTasks}</p> {/* Display total tasks */}
            </div>
            <Clock className="w-8 h-8 text-blue-500" /> {/* Icon */}
          </div>
        </div>


        {/* Completed Tasks Box */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-800">{completedTasks}</p> {/* Display completed tasks */}
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" /> {/* Icon */}
          </div>
        </div>


        {/* Pending Tasks Box */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-amber-800">{pendingTasks}</p> {/* Display pending tasks */}
            </div>
            <Clock className="w-8 h-8 text-amber-500" /> {/* Icon */}
          </div>
        </div>
      </div>


      {/* Progress Bar Section - Only show if there are tasks */}
      {totalTasks > 0 && (
        <div className="mb-8">
          {/* Progress bar heading and percentage */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-800">{completionPercentage}%</span>
          </div>
          

          {/* Progress bar container */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            {/* Filled portion of the progress bar */}
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }} // Dynamically set width
            ></div>
          </div>
        </div>
      )}

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          
          {/* Input field to type the task */}
          <input
            type="text"
            value={inputValue} // Controlled input
            onChange={(e) => setInputValue(e.target.value)} // Update state on typing
            placeholder="Add a new task..."
            className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
          />

          
          {/* Add Task Button */}
          <button
            type="submit"
            disabled={!inputValue.trim() || isAdding} // Disable if input empty or adding in progress
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
              inputValue.trim() && !isAdding
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl scale-100'
                : 'bg-gray-300 text-gray-500 scale-95'
            } ${isAdding ? 'animate-pulse' : ''}`} // Change style dynamically
          >

            {/* Plus icon (rotates when adding) */}
            <Plus className={`w-5 h-5 transition-transform duration-200 ${isAdding ? 'rotate-45' : ''}`} />
          </button>

        </div>
      </form>
    </div>
  );
};

// Export the component for use in other files
export default Header;
