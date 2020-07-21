var todoInput = document.getElementById('newTodo');
// var todoInput = document.querySelector('newTodo');
var addButton = document.querySelector('#addTodo');
var clearButton = document.querySelector('#clearTask');
var todoList = document.querySelector('#todoList');
var countTodo = document.querySelector('#taskCount');
var todoData = [];
renderPage(todoData);
//監聽按鈕
addButton.addEventListener('click',addTodo);
clearButton.addEventListener('click',clear);
todoList.addEventListener('click', doSomething);
//增加新事件
function addTodo(){
    //trim = 從字符串的兩旁刪除空格
    var newTodo = todoInput.value.trim();
    //Math.floor = 無條件捨去法取整數
    var timeStamp = Math.floor(Date.now());
    //!== 不等於  如果輸入欄不為空字串
    if (newTodo !== ''){
        //向todoData這個陣列添加物件
        todoData.push({
            id:timeStamp,
            title:newTodo,
            completed:false,
        })
        renderPage(todoData);
        //清空輸入欄
        todoInput.value = '';
    }
}
//移除事件
function removeTodo (id){
    var newIndex = 0;
    //forEach(值、索引) 箭頭函式 = return後面的值到前面的參數
    todoData.forEach((item,key) => {
        if( id == item.id){
            newIndex = key;
        }
    })
    //陣列.splice = (第N個項目, deleteCount要刪除的元素,加入的元素空值則只刪除)
    todoData.splice(newIndex,1);
    renderPage(todoData)};
//清除全部 參數e=事件
function clear(e){
    e.preventDefault();
    todoData = [];
    renderPage(todoData);
}
function doSomething(e){
    //parentNode = 父節點 , dataest = 資料集 , action = 動作
    var action = e.target.parentNode.dataset.action;
    var id = e.target.parentNode.dataset.id;
    if(action == "remove"){
        removeTodo(id)
    } else if(action =="complete"){
        completedTodo(id);
    }
}
//完成事件
function completedTodo(id){
    todoData.forEach((item) =>{
        if(id == item.id){
            item.completed = item.completed ? false : true;
        }
    })
}    
function renderPage(data){
    var str = '';
    data.forEach((item) => {
    //樣板字面值：``內放HTML
        str += `
        <li class = "list-group-item">
            <div class = "d-flex">
            <div class = "form-check" data-action="complete" data-id="${item.id}">
            <input type = "checkbox" class = "form-check-input" ${item.completed ? 'checked' : ''}>
            <label class = "form-check-label ${item.completed ? 'completed' : ''}">${item.title}</label>
            </div>
            <button type = "button" class = "close ml-auto remove" aria-label = "Close" data-action = "remove" data-id = "${item.id}">
            <span aria-hidden = "true">&times;</span>
            </button>
            </div>
        </li>
    `;})
    todoList.innerHTML = str;
    countTodo.textContent = data.length;
}