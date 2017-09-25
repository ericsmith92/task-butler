//alert('connected');
    
    //grab form
    const formHandle = document.forms[0];
    //gran other DOM elements needed
    const toDo = document.querySelector('#ul-todo');

    //array to push task into    
    let taskArr = [];
    
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
            toDo.innerHTML += `<li>${array[i]}</li><button class="ul_todo_button">Doing!</button>`;
        }
    }
    
    //listener for form submit
    formHandle.addEventListener('submit', formSubmit);
    


