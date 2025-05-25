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

        document.addEventListener('DOMContentLoaded', function() {
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
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const taskText = this.parentElement.parentElement.querySelector('.task-text').textContent;
                if (!confirm(`Are you sure you want to delete "${taskText.trim()}"?`)) {
                    e.preventDefault();
                }
            });
        });