const empties = document.querySelectorAll('.empty')
const createButton = document.querySelector('.create')
const modal = document.querySelector('#modal')
const change_modal = document.querySelector('#change-modal')
const closeButton = document.querySelector('.close')
const taskForm = document.querySelector('#form')
const change_form = document.querySelector('#change-form')
const close_change = document.querySelector('#cancel')
const taskStatusSelect = document.querySelector('#task-status')
const newItem = document.querySelector('new')
const executorsSelect = document.querySelector('#executors')
const ava = document.querySelector('#open_add_modal')
const cl = document.querySelector('#close')
const add_ava = document.querySelector('.im')
const show_add = document.querySelector("#add_modal")
const add_form = document.querySelector("#add-form")
const new_name = document.querySelector("#name")
const no_prof = document.querySelector("#profession")
const box_sel = document.querySelector('.selected-items')
const audio = document.querySelector('.audio')
const trash = document.querySelector('.trash');
const input_name = document.querySelector("#name")
const input_desc = document.querySelector("#description")
const input_time = document.querySelector("#deadline")
const input_status = document.querySelector("#status")
const input_select = document.querySelector(".change__selected-items")
const multiInp = document.querySelector(".multiSelect select")
const multiSel = document.querySelector(".multiSel select")
const selctedCont = document.querySelector(".multiSelect .selected-items")

let selected = []
let todos = []
let globalID
const team = [{
		id: Math.random(),
		name: 'John Doe',
		profession: 'Developer',
		icon: 'icon1.png'
	},
	{
		id: Math.random(),
		name: 'Jane Smith',
		profession: 'Designer',
		icon: 'icon2.png'
	},
	{
		id: Math.random(),
		name: 'Mike Johnson',
		profession: 'Project Manager',
		icon: 'icon3.png'
	},
	{
		id: Math.random(),
		name: 'Sarah Williams',
		profession: 'Marketing Specialist',
		icon: 'icon4.png'
	},
	{
		id: Math.random(),
		name: 'David Brown',
		profession: 'QA Engineer',
		icon: 'icon5.png'
	},
	{
		id: Math.random(),
		name: 'Emily Davis',
		profession: 'Data Analyst',
		icon: 'icon6.png'
	},
	{
		id: Math.random(),
		name: 'Michael Clark',
		profession: 'Business Analyst',
		icon: 'icon7.png'
	},
	{
		id: Math.random(),
		name: 'Olivia Taylor',
		profession: 'Content Writer',
		icon: 'icon8.png'
	},
	{
		id: Math.random(),
		name: 'Daniel Wilson',
		profession: 'UX/UI Designer',
		icon: 'icon9.png'
	},
	{
		id: Math.random(),
		name: 'Sophia Lee',
		profession: 'Product Manager',
		icon: 'icon10.png'
	}
]


taskForm.onsubmit = function (elem) {
	elem.preventDefault()
	let task = {
		id: Math.random()
	}

	let fm = new FormData(taskForm)

	fm.forEach((value, key) => {
		task[key] = value
	})

	task.executors = selected

	modal.style.display = 'none'
	todos.push(task)
	reload(todos)
	selected = []
	elem.target.reset()
}



function reload(arr) {
	empties.forEach(el => el.innerHTML = "")
	for (let task of arr) {
		let div = document.createElement('div')
		let s = document.createElement('div')
		let h3 = document.createElement('h3')
		let edit = document.createElement("img")
		let p_des = document.createElement('p')
		let p_dline = document.createElement('p')
		let span_dl = document.createElement('span')
		let img_dl = document.createElement('img')
		let p_who = document.createElement('div')

		div.draggable = true
		div.id = task.id
		div.classList.add('items')
		s.classList.add('s')
		edit.classList.add("edit")
		p_who.classList.add('bottom_item')
		p_dline.classList.add('deadline')
		img_dl.classList.add("exec-member")

		if (task.deadline === '') {
			img_dl = ''
		} else {
			img_dl.src = "icons/deadline.png"
		}

		h3.innerHTML = task.name
		span_dl.innerHTML = task.deadline
		edit.src = "./icons/pencil.png"
		if (task.description) p_des.innerHTML = task.description

		edit.onclick = () => {
			change_modal.style.display = "block"
			input_name.value = task.name
			input_desc.value = task.description
			input_time.value = task.deadline
			selected = task.executors
			for (var i = 0; i < input_status.options.length; i++) {
				if (input_status.options[i].value === task.status) {
					input_status.selectedIndex = i;
					break;
				}
			}

			console.log(div.id);
			globalID = div.id
			reloadSelected(task.executors, input_select, false)
		}


		for (let exec of task.executors) {
			let img_icon = document.createElement('img')
			img_icon.src = `icons/${exec.icon}`
			p_who.append(img_icon)
		}

		div.append(s)
		s.append(h3, edit)
		if (task.description) div.append(p_des)
		if (p_who.innerHTML !== '') div.append(p_who)
		if (task.deadline) div.append(p_dline)
		p_dline.append(img_dl, span_dl)
		// div.append( h3,edit, p_des, div_bottom)
		// div_bottom.append(p_dline, p_who)
		// p_dline.append(img_dl, span_dl)

		empties[task.status].append(div)


		div.ondragstart = function () {
			this.classList.add('is-dragging')
			this.classList.add('hold')
			globalID = div.id
			trash.classList.add('active');
			setTimeout(() => (div.classList.add('invisible')), 0)
		}

		div.ondragend = function (e) {
			trash.classList.remove('opened');
			setTimeout(() => {
				trash.classList.remove('active');
			}, 1000);
		};


		trash.ondragenter = (e) => {
			e.preventDefault()
		}
		trash.ondragover = (event) => {
			event.preventDefault()
			trash.classList.add('opened');
		}
		trash.ondragleave = () => {
			trash.classList.remove('opened');
		}
		trash.ondrop = function (event) {
			event.preventDefault()
			todos = todos.filter(el => el.id != +globalID)
			audio.playbackRate = 1.8;
			audio.volume = "0.3"
			audio.play()
			div.remove()
		}
	}
}


for (let empty of empties) {
	empty.ondragover = (event) => {
		event.preventDefault()
	}
	empty.ondragend = () => {
		reload(todos)
		empties.forEach(el => el.className = "empty")
	}
	empty.ondragleave = () => {
		empties.forEach(el => el.className = "empty")
	}
	empty.ondragenter = function (event) {
		event.preventDefault()
		empties.forEach(el => el.classList.remove("fill"))
		empty.classList.add("fill")
	}
	empty.ondrop = function (event) {
		event.preventDefault()
		empties.forEach(el => el.className = "empty")
		let item = document.querySelector('.is-dragging')
		let finded = todos.find(el => {
			if (el.id === +item.id) {
				return item
			}
		})
		finded.status = this.id
		this.append(item)
		item.className = "items"
		empty.className = "empty"
		reload(todos)
	}
}
createButton.onclick = () => {
	modal.style.display = 'block'
	reloadSelected(selected, selctedCont)
}
ava.onclick = () => {
	show_add.style.display = "block";
}

function close(click, arg) {
	click.onclick = () => {
		arg.style.display = "none"
	}
}
close(cl, show_add)
close(closeButton, modal)
close(close_change, change_modal)
close_change.onclick = () => {
	change_modal.style.display = "none"
	selected = []
}

add_form.onsubmit = function (event) {
	event.preventDefault()

	let name = document.querySelector("#name").value
	let profession = document.querySelector("#profession").value
	let selectedIcon = document.querySelector(".icon.selected-icon")

	if (!selectedIcon) {
		add_ava.style.opacity = '1'
		return
	}
	add_ava.style.opacity = '0'

	const icon = selectedIcon.dataset.icon

	const teamMember = {
		id: Math.random(),
		name: name,
		profession: profession,
		icon: icon
	}
	team.push(teamMember)

	new_name.value = ""
	no_prof.selectedIndex = 0
	selectedIcon.classList.remove("selected-icon")

	show_add.style.display = "none"


	let opt = new Option(teamMember.name, JSON.stringify(teamMember))
	multiInp.add(opt)

}

const icons = document.querySelectorAll(".icon")

for (const icon of icons) {
	icon.onclick = () => {
		const selectedIcon = document.querySelector(".icon.selected-icon")
		if (selectedIcon) {
			selectedIcon.classList.remove("selected-icon")
		}
		icon.classList.add("selected-icon")
	}
}



// MULTISELECT

team.forEach(item => {
	let opt = new Option(item.name, JSON.stringify(item))
	if (selected.includes(JSON.parse(opt.value))) {
		console.log("Asf");
	} else {
		multiInp.append(opt)
	}
})

team.forEach(item => {
	let opt = new Option(item.name, JSON.stringify(item))
	if (selected.includes(JSON.parse(opt.value))) {
		console.log("Asf");
	} else {
		multiSel.append(opt)

	}
})

let miltiInps = [multiInp,multiSel]
let selectContainers = [selctedCont, input_select]
miltiInps.forEach((sel, idx) => {
	sel.onchange = (e) => {
		let item = JSON.parse(e.target.value)
		
		if (!selected.find(el => el.id === item.id)) {
			selected.push(item)
		} else {
			selected = selected.filter(el => el.id !== item.id)
		}
	
		sel.value = ""
		reloadSelected(selected, selectContainers[idx], Boolean(idx))
	}
})


function reloadSelected(arr, select, isCreate = true) {
	select.innerHTML = ""

	for (let item of arr) {
		select.innerHTML += `
			<div class="selected" id="${item.id}" >
				<img src="icons/${item.icon}" alt="" />
				<span>${item.name}</span>
				<span class="del-btn">&times;</span>
			</div>
		`
	}
	const delBtns = select.parentElement.lastElementChild?.querySelectorAll('.del-btn')
	// console.log(select.parentElement.lastElementChild);

	delBtns.forEach(btn => {
		btn.onclick = () => {
			let id = +btn.parentElement.id
			selected = selected.filter(el => el.id !== id)
			if(!isCreate) {
				let finded = todos.find(el => el.id === +globalID)
				finded.executors = selected
			}
			reloadSelected(selected, select)
		}
	})
}

change_form.onsubmit = (e) => {
	e.preventDefault()
	let finded = todos.find(el => el.id === +globalID)
	if (finded) {
		finded.name = input_name.value
		finded.description = input_desc.value
		finded.deadline = input_time.value
		finded.exacutors = selected
		finded.status = input_status.value
		reload(todos)
	}
	change_modal.style.display = "none"
	selected = []
	globalID = ''
}