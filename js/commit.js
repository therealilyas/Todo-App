let addInput = document.querySelector('.todo-input');
let addBtn = document.querySelector('.add-todo-btn');
let todoList = document.querySelector('.todoList');
let countTodo = document.querySelector('.count-todo');
let deleteAllBtn = document.querySelector('.clear-todo-btn');

// It is better to use init() function to initialize the some functionality when page rendered.
// Page yaralgan vaxtta, biz browsera aytamiz ang birinji init() bajar dab, chtobi soddaliqi saqlash uchun, bashqa funksiyala ozini eventi sodir bulganda ishlidi, 
// lekn init() hech narsa eventa qaramasdan, bizani scripti browser render atganda ishlab getadi, faqat bir funksiya !

init();

function init() {
    showToDo();
}

addInput.addEventListener('keyup', (e) => {
    if (addInput.value.trim() == '') {
        addBtn.classList.remove('active');
        return;
    }
    addBtn.classList.add('active');

    // When pressed enter on the keyboard
    if (e.keyCode === 13) {
        addTodo();
    }
});

addBtn.addEventListener('click', () => {
    addTodo();
});

function addTodo() {
    // Har xil narsalarni bajaradovon kodlari bza space bilan ajratganimiz yaxshi, for READABILITY

    //Initialization 
    let userData = addInput.value;
    let getLocalStorage = localStorage.getItem("New Todo");

    // Some logic
    if (getLocalStorage == null) {
        listTodo = [];
    } else {
        listTodo = JSON.parse(getLocalStorage);
    }

    // Adding the todo
    listTodo.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listTodo));

    //Then showing it 
    showToDo();

    // Clearing the app
    addInput.value = '';
    addBtn.classList.remove('active');
}

// Qalgan xamma kodlaringam space blan ajrat
// Novini bajarb durganini dapadakilari oxshatb yaz

//ekrana ciqarishimiz un funksiya yaratamiz
function showToDo() {
    // Initialization
    let getLocalStorage = localStorage.getItem('New Todo');
    //agar local hotira ici pustoy bosa
    if (getLocalStorage == null) {

        //pustoy array baramiz
        listTodo = [];

        // bomasa
    } else {

        //array icina json obyekt diqamiz
        listTodo = JSON.parse(getLocalStorage);

    } //agar arraydagi spiska soni 0 dan katta bosa 
    if (listTodo.length > 0) {
        // hammasini ociradon knopka yansin
        deleteAllBtn.classList.add('active');

    }
    // bomasa
    else {

        // knopka ocik dursin
        deleteAllBtn.classList.remove('active');
    }

    // Li yaratisha tayorgarlik
    let todoLI = '';

    //arraydagi har bir elementa
    listTodo.forEach((element, index) => {

        //icina pastagi LIni qoshadi
        // yani arraydagi har bir elementni vizualni shunga ozgartiradi
        todoLI +=

            ` 
        <li>
        <span>${element}</span><button class='remove-todo-btn' onclick='deleteTodo(${index})'>-</button>
        </li>
        `;

    });

    // prisvoit atib algan LI ni todo ULni html ga diqamiz
    todoList.innerHTML = todoLI;

    // arrayni hotiraga diqamiz
    localStorage.setItem("New Todo", JSON.stringify(listTodo));

    // arraydagi elementla sonini Vizual gorinib turishi un countTodo elemenni icina diqamiz
    countTodo.innerText = listTodo.length;
}


// index boyica ociradon funksiya yaratib olamiz
// elementimiz vizual bolganda yaninda minus button yaraladi, shuni bosgandagi hodisaga funksia yaratilyotir
function deleteTodo(i) {

    //local hotira ocdiq
    let getLocalStorage = localStorage.getItem("New Todo");

    // json obyektni array icina diqdiq
    listTodo = JSON.parse(getLocalStorage);

    // index boyica 1 element ociramiz
    listTodo.splice(i, 1);

    // ozgargan arrayni hotiraga diqamiz
    localStorage.setItem("New Todo", JSON.stringify(listTodo));

    // ozgarishlarni ekrana ciqaramiz
    showToDo();
}

// Clear All Btn ni bosganda, novi hodisa bolish garakligini aytamiz
deleteAllBtn.addEventListener('click', () => {

    // arrayni bosh atamiz
    listTodo = [];

    // ozgargan arrayni hotiraga diqamiz
    localStorage.setItem('New Todo', JSON.stringify(listTodo));

    // ozgarishni ekrana ciqaramiz
    showToDo();
});