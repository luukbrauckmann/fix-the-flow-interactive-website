const inputs = document.querySelectorAll('input')
for(let input of inputs) input.addEventListener('blur', () => input.dataset['touched'] = true)
