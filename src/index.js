require('./style/app.css')

var element = document.createElement('div')

element.innerHTML = '<h1>haha</h1>'
element.classList.add('hello')

document.body.appendChild(element)