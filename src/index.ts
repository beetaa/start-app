import './style/app.css'

import add from './lib/myfun'

const element = document.createElement('div')

element.innerHTML = `<h3>hello ${add(1, 1)}</h3>`
element.classList.add('hello')

console.log('hello')

document.body.appendChild(element)