// global var
var count = window.localStorage.length;
var count_today = 0;
var count_finished = 0;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

var dateControl = document.querySelector('input[type="date"]');
dateControl.value = today;

function fetchAllStorage()
{
  var cur_date = today.split("-");
  var archive = [],
      keys = Object.keys(localStorage),
      i = 0, key;

  for (; key = keys[i]; i++) {
      var task_date = localStorage.getItem(key).split(" | ");
      var task1_date = task_date[1].split("-");
      console.log(task1_date);

      if(task_date[1] === today)
      {     	
        addTaskLi(key, task_date[0], task_date[1], "todayList");
        count_today++;
      }
      else if (parseInt(cur_date[2]) + 1 === parseInt(task1_date[2]))
      {
        addTaskLi(key, task_date[0], task_date[1], "tomorrowList");
      }
      else
      {
        addTaskLi(key, task_date[0], task_date[1], "otherList");
      }

  }
  //addEvent1();
  count = keys.length + 1;
  return archive;
}

function addEvent1()
{
  var list = document.querySelectorAll('li');

    Array.prototype.slice.call(list).forEach(function(listItem){
    listItem.addEventListener('click', function(e){
      document.getElementById(this.id).style.color = "green";
      console.log(this.id);
      console.log(this.innerHTML);
    });
  });
}


function init()
{
    if (count === null)
    {
      console.log("Local storage is empty")
    }
    else
    {
      console.log("local storage is not empty")
      fetchAllStorage();
      document.getElementById("completed_task").innerHTML = count_finished + "/" + count_today;      
    }
}

function addFinishedLi(id, text, list)
{
  // add to done list
  var node = document.createElement("LI");
  node.setAttribute("id", id);
  node.setAttribute("class", "list-group-item");
  node.style.backgroundColor = "#c000ff";
  node.style.textDecorationLine = "line-through";
  var textnode = document.createTextNode(text);
  node.appendChild(textnode);
  document.getElementById(list).appendChild(node);
  fadeOutEffect(id);
  // Remove from task list
  setTimeout(remove, 1000);

  function remove()
  {
    var el = document.getElementById(id);
    el.remove();
  }
  document.getElementById("completed_task").innerHTML = (count_finished) + "/" + count_today;
  // Remove from Local Storage
  localStorage.removeItem(id);
}

function addTask()
{
  count++;
  var title = document.getElementById("task").value;
  var date = document.getElementById("date").value;

  var cur_date = today.split("-");
  var task_date = date.split("-");


  if(title == "")
  {
    alert("Please enter a title to submit your task.");
  }
  else
  {
  	//alert(  parseInt(task_date[2]) == parseInt(cur_date[2]) + 1)
    if(date == today)
    {  
      addTaskLi(this.count, title, date, "todayList");
      var x = document.getElementById("collapseOne");
      x.classList.add("show");
      count_today++;
      document.getElementById("completed_task").innerHTML = count_finished + "/" + count_today;
    }
    else if (parseInt(cur_date[2]) + 1 == parseInt(task_date[2]))
    {  	
      addTaskLi(this.count, title, date, "tomorrowList");
      var x = document.getElementById("collapseTwo");
        x.classList.add("show");
    }
    else
    {
    	addTaskLi(this.count, title, date, "otherList");
      	var x = document.getElementById("collapseTwo");
        x.classList.add("show");
    }

  // Store
  window.localStorage.setItem(count, title + " | " + date);
  }
     document.getElementById("task").value = "";
}


function addTaskLi(count, title, date, list)
{
  var node = document.createElement("LI");
    node.setAttribute("id", count);
    node.setAttribute("class", "list-group-item");
    node.style.backgroundColor = "yellow";
    var textnode = document.createTextNode(title + " | " + date);
    

    node.appendChild(textnode);
    document.getElementById(list).appendChild(node);

    node.addEventListener('click', function(e)
    {
      document.getElementById(this.id).style.color = "green";
      console.log(this.id);
      console.log(this.innerHTML);
      // if(flag !== null)
      // {
        var task_date = this.innerHTML.split(" | ");
        //var task1_date = task_date[1].split("-");
        //var cur_date = today.split("-");
        console.log(task_date);
        if(task_date[1] === today)
        {
            count_finished++;
            document.getElementById("completed_task").innerHTML = count_finished + "/" + count_today;
        }
        addFinishedLi(this.id, this.innerHTML, "doneList");
    });
}



function fadeOutEffect(id) 
{
    var fadeTarget = document.getElementById(id);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.3;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}

document.getElementById("target").addEventListener('click', fadeOutEffect);
