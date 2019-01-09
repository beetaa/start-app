import './style/app.css'
import add from './lib/myfun'

var element = document.createElement('div')

element.innerHTML = `<h3>hello ${add(1, 1)}</h3>`
element.classList.add('hello')

document.body.appendChild(element)