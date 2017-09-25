//alert('connected');
    
    //grab form
    const formHandle = document.forms[0];
    //grab other DOM elements needed
    const toDo = document.querySelector('#ul-todo');
    const doing = document.querySelector('#ul-doing');
    const done = document.querySelector('#ul-done');
    const clear = document.querySelector('#clear');
    //array to push task into    
    let taskArr = [];

    //array to push doing into
    let doingArr = [];

    //array to push done into
    let doneArr = [];
    
    //function to add task to todo
    function formSubmit(e){
        //prevent default submit behavior        
        e.preventDefault();
        
        taskArr.push(formHandle.task.value);
        
        taskToHtml(taskArr);
    }

    //loop through task array and put contents into TODO
    function taskToHtml(array){
        toDo.innerHTML = '';
        for(let i = 0; i < array.length; i++){
            toDo.innerHTML += `<li>${array[i]}<button class="ul_todo_button">Doing!</button></li>`;
        }
        
        return document.querySelectorAll('.ul_todo_button').forEach(button => button.addEventListener('click', taskToDoing));
    }

    //function to add todoing
    function taskToDoing(){
        
        doing.innerHTML = '';
        doingArr.push(this.parentElement.textContent.split('Doing!').shift());
        
        for(let i = 0; i < doingArr.length; i++){
            doing.innerHTML += `<li>${doingArr[i]}<button class="ul_doing_button">Done!</button></li>`;
        }
        
         return document.querySelectorAll('.ul_doing_button').forEach(button => button.addEventListener('click', taskToDone));        
    }

    //function to add to done 
    function taskToDone(){
        
        done.innerHTML = '';
        doneArr.push(this.parentElement.textContent.split('Done!').shift());
        
        for(let i = 0; i < doneArr.length; i++){
            done.innerHTML += `<li>${doneArr[i]}</li>`;
        } 
        
    }

    //function to clear all
    function clearAll(){
        toDo.innerHTML = '';
        doing.innerHTML = '';
        done.innerHTML = '';        
    }
    
    //listener for form submit
    formHandle.addEventListener('submit', formSubmit);
    
    //listener for clear
    clear.addEventListener('click', clearAll);

    


