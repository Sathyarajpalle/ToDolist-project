document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const editForm = document.getElementById('editForm');
  const saveChangesBtn = document.getElementById('saveChangesBtn');
  const editTaskTitleInput = document.getElementById('editTaskTitle');
  const editDueDateInput = document.getElementById('editDueDate');
  const editTaskIndexInput = document.getElementById('editTaskIndex');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      taskList.innerHTML = '<p>Welcome! No tasks yet.</p>';
    } else {
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
          <p><strong>${task.title}</strong> - Due: ${task.dueDate}</p>
          <button class="btn btn-sm btn-info edit-btn" data-index="${index}" data-toggle="modal" data-target="#editModal">Edit</button>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
          <button class="btn btn-sm btn-success complete-btn" data-index="${index}">${task.completed ? 'Incomplete' : 'Complete'}</button>
        `;
        if (task.completed) {
          taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
      });
    }
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask(title, dueDate) {
    tasks.push({ title, dueDate, completed: false });
    saveTasks();
    renderTasks();
  }

  function editTask(index, title, dueDate) {
    tasks[index].title = title;
    tasks[index].dueDate = dueDate;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    alert('The task has been completed');
    saveTasks();
    renderTasks();
  }

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const dueDate = document.getElementById('dueDate').value;
    addTask(title, dueDate);
    taskForm.reset();
  });

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.dataset.index;
      deleteTask(index);
    }
    if (e.target.classList.contains('complete-btn')) {
      const index = e.target.dataset.index;
      completeTask(index);
    }
    if (e.target.classList.contains('edit-btn')) {
      const index = e.target.dataset.index;
      const task = tasks[index];
      editTaskIndexInput.value = index;
      editTaskTitleInput.value = task.title;
      editDueDateInput.value = task.dueDate;
    }
  });

  saveChangesBtn.addEventListener('click', () => {
    const index = editTaskIndexInput.value;
    const title = editTaskTitleInput.value;
    const dueDate = editDueDateInput.value;
    editTask(index, title, dueDate);
    $('#editModal').modal('hide');
  });

  renderTasks();
});