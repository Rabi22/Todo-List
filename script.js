// Toggle task completion
function toggleTask(checkbox) {
    checkbox.classList.toggle('checked');
    const taskText = checkbox.nextElementSibling;
    taskText.classList.toggle('completed');
    
    const listItem = checkbox.parentElement;
    listItem.style.transform = 'translateZ(20px) scale(1.02)';
    setTimeout(() => {
        listItem.style.transform = '';
    }, 200);
}

// Enter edit mode
function editTask(index) {
    const taskElement = document.querySelector(`[data-task-index="${index}"]`);
    const taskText = taskElement.querySelector('.task-text');
    const actionsDiv = taskElement.querySelector('.task-actions');
    
    const currentText = taskText.textContent.trim();
    
    // Create edit form
    const editForm = document.createElement('form');
    editForm.className = 'edit-form';
    editForm.innerHTML = `
        <input type="text" class="edit-input" value="${currentText}" required>
        <button type="button" class="btn save-btn" onclick="saveTask(${index})">Save</button>
        <button type="button" class="btn cancel-btn" onclick="cancelEdit(${index})">Cancel</button>
    `;
    
    // Hide task text and actions
    taskText.classList.add('hidden');
    actionsDiv.classList.add('hidden');
    
    // Add edit form
    taskElement.appendChild(editForm);
    
    // Focus on input
    const input = editForm.querySelector('.edit-input');
    input.focus();
    input.select();
    
    // Handle Enter key to save
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveTask(index);
        }
    });
    
    // Handle Escape key to cancel
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit(index);
        }
    });
}

// Save edited task
function saveTask(index) {
    const taskElement = document.querySelector(`[data-task-index="${index}"]`);
    const editForm = taskElement.querySelector('.edit-form');
    const input = editForm.querySelector('.edit-input');
    const newText = input.value.trim();
    
    if (newText === '') {
        alert('Task cannot be empty!');
        input.focus();
        return;
    }
    
    // Create and submit form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/edit';
    form.style.display = 'none';
    
    const indexInput = document.createElement('input');
    indexInput.type = 'hidden';
    indexInput.name = 'taskIndex';
    indexInput.value = index;
    
    const textInput = document.createElement('input');
    textInput.type = 'hidden';
    textInput.name = 'newText';
    textInput.value = newText;
    
    form.appendChild(indexInput);
    form.appendChild(textInput);
    document.body.appendChild(form);
    form.submit();
}

// Cancel edit mode
function cancelEdit(index) {
    const taskElement = document.querySelector(`[data-task-index="${index}"]`);
    const taskText = taskElement.querySelector('.task-text');
    const actionsDiv = taskElement.querySelector('.task-actions');
    const editForm = taskElement.querySelector('.edit-form');
    
    // Remove edit form
    if (editForm) {
        editForm.remove();
    }
    
    // Show task text and actions
    taskText.classList.remove('hidden');
    actionsDiv.classList.remove('hidden');
}

// Delete task with confirmation
function deleteTask(index, taskText) {
    if (confirm(`Are you sure you want to delete "${taskText.trim()}"?`)) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/delete';
        form.style.display = 'none';
        
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'taskIndex';
        input.value = index;
        
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Animate list items on load
    const listItems = document.querySelectorAll('li');
    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) translateZ(-10px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) translateZ(10px)';
        }, index * 100);
    });
    
    // Add click event to task text for editing
    document.querySelectorAll('.task-text').forEach((text, index) => {
        text.addEventListener('dblclick', function() {
            editTask(index);
        });
    });
    
    // Improve form validation
    const addForm = document.querySelector('form[action="/"]');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            const input = this.querySelector('input[name="ele1"]');
            if (input.value.trim() === '') {
                e.preventDefault();
                alert('Please enter a task!');
                input.focus();
            }
        });
    }
});
