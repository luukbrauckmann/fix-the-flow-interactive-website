const signInInputs = document.querySelectorAll('input')
for(let input of signInInputs) input.addEventListener('blur', () => input.dataset['touched'] = true)