document.addEventListener('DOMContentLoaded', () => {
  // Skill slider functionality
  document.querySelectorAll('.skill-slider').forEach(slider => {
    const valueDisplay = slider.nextElementSibling;
    
    slider.addEventListener('input', (e) => {
      valueDisplay.textContent = e.target.value;
    });
  });

  // Add subject functionality
  const subjectsContainer = document.getElementById('subjectsContainer');
  document.querySelector('.add-subject').addEventListener('click', () => {
    const input = subjectsContainer.querySelector('input');
    if (input.value.trim()) {
      const tag = document.createElement('div');
      tag.className = 'inline-block bg-purple-600 rounded-lg px-3 py-1 text-sm mr-2 mb-2';
      tag.textContent = input.value;
      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'ml-2 text-purple-200 hover:text-white';
      removeBtn.textContent = '×';
      removeBtn.onclick = () => tag.remove();
      
      tag.appendChild(removeBtn);
      subjectsContainer.insertBefore(tag, subjectsContainer.firstChild);
      input.value = '';
    }
  });

  // Add hobby functionality
  const hobbiesContainer = document.getElementById('hobbiesContainer');
  document.querySelector('.add-hobby').addEventListener('click', () => {
    const input = hobbiesContainer.querySelector('input');
    if (input.value.trim()) {
      const tag = document.createElement('div');
      tag.className = 'inline-block bg-purple-600 rounded-lg px-3 py-1 text-sm mr-2 mb-2';
      tag.textContent = input.value;
      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'ml-2 text-purple-200 hover:text-white';
      removeBtn.textContent = '×';
      removeBtn.onclick = () => tag.remove();
      
      tag.appendChild(removeBtn);
      hobbiesContainer.insertBefore(tag, hobbiesContainer.firstChild);
      input.value = '';
    }
  });

  // Career values drag and drop
  const careerValues = document.getElementById('careerValues');
  let draggedItem = null;

  document.querySelectorAll('.value-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      draggedItem = item;
      setTimeout(() => item.classList.add('dragging'), 0);
    });

    item.addEventListener('dragend', () => {
      draggedItem = null;
      item.classList.remove('dragging');
    });
  });

  careerValues.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(careerValues, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement) {
      careerValues.insertBefore(draggable, afterElement);
    } else {
      careerValues.appendChild(draggable);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.value-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  // Radio button animations
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const container = radio.closest('div');
      container.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
      radio.parentElement.classList.add('selected');
    });
  });

  // Form submission
  document.getElementById('assessmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
      subjects: Array.from(subjectsContainer.querySelectorAll('.bg-purple-600')).map(tag => tag.textContent.slice(0, -1)),
      skills: Array.from(document.querySelectorAll('.skill-slider')).map(slider => ({
        skill: slider.previousElementSibling.textContent,
        rating: slider.value
      })),
      hobbies: Array.from(hobbiesContainer.querySelectorAll('.bg-purple-600')).map(tag => tag.textContent.slice(0, -1)),
      workEnvironment: document.querySelector('input[name="environment"]:checked')?.value,
      careerValues: Array.from(careerValues.querySelectorAll('.value-item')).map(item => item.textContent.trim()),
      roleModels: document.querySelector('textarea').value,
      longTermGoal: document.querySelector('input[placeholder="Your ultimate career aspiration"]').value,
      challenges: document.querySelector('select').value,
      learningStyle: document.querySelector('input[name="learning-style"]:checked')?.value,
      techLevel: document.querySelector('input[name="tech-level"]:checked')?.value,
      additionalComments: document.querySelector('textarea[rows="4"]').value
    };

    try {
      // Here you would typically send the data to your backend
      console.log('Assessment submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Assessment submitted successfully! We\'ll analyze your responses and provide personalized career recommendations.');
      
      // Redirect to results page (you'll need to create this)
      // window.location.href = 'results.html';
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit assessment. Please try again.');
    }
  });
});