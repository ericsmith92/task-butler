//alert('connected');
function pageLoaded(){  
    
    //grab form
    const formHandle = document.forms[0];
    //grab other DOM elements needed
    const toDo = document.querySelector('#ul-todo');
    const doing = document.querySelector('#ul-doing');
    const done = document.querySelector('#ul-done');
    const clear = document.querySelector('#clear');
    
    //array to push task into    
    let taskArr = JSON.parse(localStorage.getItem("toDo")) !== null ? JSON.parse(localStorage.getItem("toDo")) : [];

    //array to push doing into
    let doingArr = JSON.parse(localStorage.getItem("doing")) !== null ? JSON.parse(localStorage.getItem("doing")) : [];

    //array to push done into
    let doneArr = JSON.parse(localStorage.getItem("done")) !== null ? JSON.parse(localStorage.getItem("done")) : [];
    
    //loop through local storage items and display
    
    checkLocalStor(taskArr, toDo, 'ul_todo_button', 'Doing!');
    
    checkLocalStor(doingArr, doing, 'ul_doing_button', 'Done!');
    
    //check local storage function
    function checkLocalStor(array, element, btnClass, text){
        if(array !== null){
            for(let i = 0; i < array.length; i++){
                element.innerHTML += `<li>${array[i]}<button class="${btnClass}">${text}</button></li>`;
            }
            
            let funcCall = btnClass === 'ul_todo_button' ? taskToDoing : taskToDone;
            
            console.log(funcCall);
            
            return document.querySelectorAll('.' + btnClass).forEach(button => button.addEventListener('click', funcCall)); 
        }
    }
    
    const storedDone = JSON.parse(localStorage.getItem("done"));
    
    if(storedDone !== null){
        for(let i = 0; i < storedDone.length; i++){
            done.innerHTML += `<li>${storedDone[i]}</li>`;
        }
    }
    
        
    //function to add task to todo
    function formSubmit(e){
        //prevent default submit behavior        
        e.preventDefault();
        //push form item into tast array
        taskArr.push(formHandle.task.value);
        
        //add to local storage
        localStorage.setItem("toDo", JSON.stringify(taskArr));
        
        taskToHtml(taskArr);
    }

    //loop through task array and put contents into TODO
    function taskToHtml(array){
        //empty ul html each time
        toDo.innerHTML = '';
        for(let i = 0; i < array.length; i++){
            toDo.innerHTML += `<li>${array[i]}<button class="ul_todo_button">Doing!</button></li>`;
        }
        
        return document.querySelectorAll('.ul_todo_button').forEach(button => button.addEventListener('click', taskToDoing));
    }
    
    //function to add todoing
    function taskToDoing(){
        //empty ul html each time
        doing.innerHTML = '';
        doingArr.push(this.parentElement.textContent.split('Doing!').shift());
        
        //add to local storage
        localStorage.setItem("doing", JSON.stringify(doingArr));
        
        for(let i = 0; i < doingArr.length; i++){
            doing.innerHTML += `<li>${doingArr[i]}<button class="ul_doing_button">Done!</button></li>`;
        }
        
         return document.querySelectorAll('.ul_doing_button').forEach(button => button.addEventListener('click', taskToDone));        
    }

    //function to add to done 
    function taskToDone(){
        //empty ul html each time
        done.innerHTML = '';
        doneArr.push(this.parentElement.textContent.split('Done!').shift());
        
        //add to local storage
        localStorage.setItem("done", JSON.stringify(doneArr));
        
        for(let i = 0; i < doneArr.length; i++){
            done.innerHTML += `<li>${doneArr[i]}</li>`;
        } 
        
    }

    //function to clear all
    function clearAll(){
        //empty all lists
        toDo.innerHTML = '';
        doing.innerHTML = '';
        done.innerHTML = '';
        //clearn localStorage
        localStorage.clear();
        //set arrays to empty
        taskArr = [];
        doingArr = [];
        doneArr = [];
    }
    
    //listener for form submit
    formHandle.addEventListener('submit', formSubmit);
    
    //listener for clear
    clear.addEventListener('click', clearAll);
}//end pageLoaded()
window.onload = pageLoaded;