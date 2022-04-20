let todoInput //miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo // info o braku zadań / konieczności wpisania treści zadania
let addBtn // przyciks dodający nowe elementy do listy 
let ulList // lista zadań (ul)
let newTodo // nowe Li, nowe zadanie

let popup // popup
let popupInfo // teskt w popupie
let todoToEdit // edytowany Todo
let popupInput // input w popupie
let popupAddBtn // przycisk zatwierdzający w popupie
let popupCloseBtn // przycisjk zamykający popup

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    //pobieramy wszystkie elementy
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    // nadajemy nasłuchiwanie
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}



const addNewTodo = () => {
    // tworzymy nowe zadanie
    if (todoInput.value !== ''){
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        ulList.append(newTodo)
        creatToolsArea()

        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania!'
    }
}

const creatToolsArea = () => {
    // do nowego zadania dodajemy ikony
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(completeBtn, editBtn, deleteBtn)

}

const checkClick = e => {
    // sprawdzamy który został wciśnięty
    if (e.target.matches('.complete')){
        
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
        
    } else if (e.target.matches('.edit')){

        editTodo(e)

    } else if (e.target.matches('.delete')){

        deleteTodo(e)
    }

}

const editTodo = (e) => {
    // wywołujemy popup 
    todoToEdit = e.target.closest('li')
    
    popupInput.value = todoToEdit.firstChild.textContent
    popup.style.display = 'flex'
}

const closePopup = () => {
    // zamykamy popup
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    // zmieniamy tekst zadania w popupie
    if(popupInput.value !== ''){
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść!'
    }
}

const deleteTodo = e => {
    // usuwamy zadania
    e.target.closest('li').remove()
    
    const allTodos = ulList.querySelectorAll('li')

    if(allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście'
    }

}

const enterKeyCheck = e => {
    // dodajemy zadania za pomocą klawisza Enter
    if(e.key === 'Enter'){
        addNewTodo()
    }
}




document.addEventListener('DOMContentLoaded', main)