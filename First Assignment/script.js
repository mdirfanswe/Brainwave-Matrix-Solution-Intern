// Select DOM elements
const dateElement = document.getElementById('date');
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const prioritySelect = document.getElementById('priority');
const addTodoButton = document.getElementById('add-todo');
const clearTodoButton = document.getElementById('clear-todo');
const notesArea = document.getElementById('notes-area');
const scheduleInputs = document.querySelectorAll('.schedule-input');
const clearScheduleButton = document.getElementById('clear-schedule');

// Display current date and time
const updateDate = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    dateElement.textContent = now.toLocaleString('en-US', options);
};
updateDate();
setInterval(updateDate, 60000); // Update every minute

// To-Do List functionality
addTodoButton.addEventListener('click', () => {
    const newTodoText = newTodoInput.value.trim();
    const priority = prioritySelect.value;
    if (newTodoText) {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox"> ${newTodoText}`;
        li.classList.add(priority); // Add priority class
        todoList.appendChild(li);
        newTodoInput.value = ''; // Clear input
    }
});

// Mark tasks as completed
todoList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const li = e.target.parentElement;
        li.classList.toggle('completed', e.target.checked);
    }
});

// Clear completed tasks
clearTodoButton.addEventListener('click', () => {
    const completedTasks = todoList.querySelectorAll('.completed');
    completedTasks.forEach(task => task.remove());
});

// Schedule persistence
scheduleInputs.forEach(input => {
    // Load saved events
    const savedEvent = localStorage.getItem(`schedule-${input.dataset.hour}`);
    if (savedEvent) input.value = savedEvent;

    // Save events on input
    input.addEventListener('input', () => {
        localStorage.setItem(`schedule-${input.dataset.hour}`, input.value);
    });
});

// Clear all schedule
clearScheduleButton.addEventListener('click', () => {
    scheduleInputs.forEach(input => {
        input.value = '';
        localStorage.removeItem(`schedule-${input.dataset.hour}`);
    });
});

// Notes persistence
notesArea.addEventListener('input', () => {
    localStorage.setItem('notes', notesArea.value);
});

// Load notes from local storage
const savedNotes = localStorage.getItem('notes');
if (savedNotes) {
    notesArea.value = savedNotes;
}

// Weather simulation (placeholder)
const weatherInfo = document.getElementById('weather-info');
const simulateWeather = () => {
    weatherInfo.textContent = `Sunny, 25°C (Simulated - ${new Date().toLocaleTimeString()})`;
};
simulateWeather();
setInterval(simulateWeather, 60000); // Update every minute