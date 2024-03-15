import { component$, useStore } from '@builder.io/qwik';

export default component$(() => {
  const store = useStore({
    tasks: [] as string[],
    newTask: '',
  });

  const containerStyle = `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
const inputStyle = `
  padding: 10px; 
  margin-right: 5px;
  font-size: 16px; 
  border: 1px solid #ccc;
  border-radius: 4px;`;
const buttonStyle = `
  padding: 10px 15px; 
  background-color: #007bff; 
  color: white; 
  border: none; 
  cursor: pointer; 
  font-size: 16px; 
  border-radius: 4px;`;
const ulStyle = `
  list-style: none; 
  padding: 0; 
  width: 50%;`;
const liStyle = `
  margin: 5px 0; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  background-color: black; 
  padding: 10px; 
  border-radius: 4px;`;
  const taskTextStyle = `
  flex-grow: 1;
  margin-right: 10px;
  color: black ;`
const deleteButtonStyle = `
  padding: 5px 10px; 
  background-color: #dc3545; 
  color: white; 
  border: none; 
  cursor: pointer;`;

return (
  <div style={containerStyle}>
    <h1 style="font-size: 24px; margin-bottom: 20px;">Qwik To-Do App</h1>
    <div style="width: 100%; display: flex; justify-content: center;">
      <input
        type="text"
        placeholder="Enter a new task"
        value={store.newTask}
        onInput$={(event) => (store.newTask = (event.target as HTMLInputElement).value)}
        style={inputStyle}
      />
      <input
        type="date"
        placeholder="Due Date"
        onInput$={(event) => (store.newTaskDate = (event.target as HTMLInputElement).value)}
        style={inputStyle}
      />
      <button
        onClick$={() => {
          if (store.newTask.trim() && store.newTaskDate) {
            store.tasks.push({
              description: store.newTask.trim(),
              dueDate: store.newTaskDate,
              completed: false,
            });
            store.newTask = '';
            store.newTaskDate = '';
          }
        }}
        style={buttonStyle}
      >
        Add Task
      </button>
    </div>
    <ul style={ulStyle}>
      {store.tasks.map((task, index) => (
        <li key={index} style={liStyle}>
          <input
            type="checkbox"
            checked={task.completed}
            onInput$={() => (task.completed = !task.completed)}
          />
          <span style={task.completed ? taskTextStyle : ''}>{task.description} - {task.dueDate}</span>
          <button
            onClick$={() => {
              store.tasks.splice(index, 1);
            }}
            style={deleteButtonStyle}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);
});