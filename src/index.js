import './style/app.css'

import add from './lib/myfun'

var element = document.createElement('div')

element.innerHTML = `<h1>haha，${add(1, 5)}</h1>`
element.classList.add('hello')

document.body.appendChild(element)