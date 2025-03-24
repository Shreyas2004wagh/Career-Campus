// Form validation and submission handling
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  // Password strength checker
  function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  }

  // Password strength indicator
  if (signupForm) {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    passwordInput.addEventListener('input', (e) => {
      const password = e.target.value;
      const strength = checkPasswordStrength(password);
      
      // Remove existing strength indicator
      const existingIndicator = passwordInput.parentElement.querySelector('.password-strength');
      if (existingIndicator) {
        existingIndicator.remove();
      }
      
      // Add new strength indicator
      const strengthIndicator = document.createElement('div');
      strengthIndicator.className = 'password-strength';
      
      if (strength < 2) {
        strengthIndicator.classList.add('weak');
      } else if (strength < 4) {
        strengthIndicator.classList.add('medium');
      } else {
        strengthIndicator.classList.add('strong');
      }
      
      passwordInput.parentElement.appendChild(strengthIndicator);
    });

    // Password confirmation validation
    confirmPasswordInput.addEventListener('input', (e) => {
      if (e.target.value !== passwordInput.value) {
        confirmPasswordInput.setCustomValidity('Passwords do not match');
      } else {
        confirmPasswordInput.setCustomValidity('');
      }
    });
  }

  // Form submission handling
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to dashboard on success
        window.location.href = 'index.html';
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', { firstName, lastName, email });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to dashboard on success
        window.location.href = 'index.html';
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      }
    });
  }

  // Social login buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      if (e.currentTarget.querySelector('svg')) {
        e.preventDefault();
        const provider = e.currentTarget.querySelector('svg').getAttribute('data-provider');
        console.log(`Social login attempted with provider: ${provider}`);
      }
    });
  });

  // Form input animations
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}