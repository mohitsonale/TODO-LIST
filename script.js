
const form = document.querySelector('form');
const input = document.querySelector('input');
const taskList = document.querySelector('.task-list');
const progress = document.getElementById('progress');
const numbers = document.getElementById('numbers');

let tasks = [];


form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText) {
    const task = { text: taskText, done: false };
    tasks.push(task);
    input.value = '';
    renderTasks();
  }
});


function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.done) {
      li.classList.add('done');
    }

 
    li.addEventListener('click', () => {
      task.done = !task.done;
      renderTasks();
    });

    li.addEventListener('dblclick', () => {
      const newText = prompt('Edit your task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.border = 'none';
    deleteBtn.style.color = 'inherit';
    deleteBtn.style.fontSize = '18px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.marginLeft = '20px';

    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateStats();
}


function updateStats() {
  const doneCount = tasks.filter(task => task.done).length;
  numbers.textContent = `${doneCount}/${tasks.length}`;

  const progressPercent = tasks.length ? (doneCount / tasks.length) * 100 : 0;
  progress.style.width = `${progressPercent}%`;
}
 

