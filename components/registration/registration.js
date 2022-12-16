var registrationInputs = document.querySelectorAll('input')
for(let input of registrationInputs) input.addEventListener('blur', () => input.dataset['touched'] = true)
