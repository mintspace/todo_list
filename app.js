
const form = document.querySelector('#submit-form');
const todoText = document.querySelector('#todo-text');
const todoList = document.querySelector('#todo-list');
let lili = JSON.parse(localStorage.getItem("list")) || [];

for (let i = 0; i < lili.length; i++) {
	let newTodo = document.createElement('li');
	let removeBtn = document.createElement('button');
	removeBtn.innerText = 'X';
	newTodo.innerText = lili[i].task;
	todoText.value = '';
	if (lili[i].completed == true) {
		newTodo.classList = "completed";
	}
	newTodo.appendChild(removeBtn);
	todoList.appendChild(newTodo);
}

todoList.addEventListener('click', function(e) {
	e.preventDefault();

	if (e.target.tagName === 'BUTTON') {
		let liliTmp = JSON.parse(localStorage.getItem("list"))
		let item = getInnerValue(e.target.parentElement.innerText);
		let newArr = liliTmp.filter(function(itm) {
			return itm['task'] != item;
		});
		localStorage.clear();
		localStorage.setItem("list", JSON.stringify(newArr));
		e.target.parentElement.remove();
	}
	if (e.target.tagName === 'LI') {
		let comp = getInnerValue(e.target.innerText);

		for (let i = 0; i < lili.length; i++) {
			if (lili[i]['task'] == comp) {
				lili[i].completed = true;
			}
			localStorage.clear();
			localStorage.setItem("list", JSON.stringify(lili));
		}
		e.target.classList.add('completed');
	}
})

form.addEventListener('submit', function(e) {
	e.preventDefault();

	if (todoText.value == '') {
		alert("Write something todo!")
	}
	if (todoText.value != '') {
		for (let i = 0; i < lili.length; i++) {
			// console.log(lili[i]['task'])
			if (lili[i]['task'] == todoText.value) {
				alert("Already in list")
				form.reset();
				return null;
			}
		}
		// console.log(todoText.value);
		const newTodo = document.createElement('li');
		const removeBtn = document.createElement('button');
		removeBtn.innerText = 'X';
		newTodo.innerText = todoText.value;
		newTodo.appendChild(removeBtn);
		todoList.appendChild(newTodo);

		if (newTodo.innerText != null) {
			lili.push({ task: todoText.value, completed: false });
			localStorage.setItem("list", JSON.stringify(lili));
		}
	} else
		return null;
	form.reset();
})

function getInnerValue(val) {
	let item = val.substring(0, val.length - 2);
	return item;
}
