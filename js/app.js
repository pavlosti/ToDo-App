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

function init()
{

    if (count === null)
    {
      console.log("Local storage is empty")
    }
    else
    {
      console.log("local storage is not empty")
      allStorage();
      document.getElementById("completed_task").innerHTML = count_finished + "/" + count_today;
      addEvent();
    }

}


function allStorage()
{
  var cur_date = today.split("-");
  var archive = [],
      keys = Object.keys(localStorage),
      i = 0, key;

  for (; key = keys[i]; i++) {      
      var task_date = localStorage.getItem(key).split(" ");
      var task1_date = task_date[1].split("-");
      console.log(task1_date);


      if(task_date[1] === today)
      {
        addTaskLi(key, localStorage.getItem(key), task_date[1], "todayList");  
        count_today++;
      }
      else if (parseInt(cur_date[1]) + 1 === parseInt(task1_date[1])) 
      {
        addTaskLi(key, localStorage.getItem(key), task_date[1], "tomorrowList");       
      }       
      
  }
  count = keys.length + 1;
  return archive;
}

function addEvent()
{
   var list = document.querySelectorAll('li');

    Array.prototype.slice.call(list).forEach(function(listItem){
    listItem.addEventListener('click', function(e){
      document.getElementById(this.id).style.color = "green";
      console.log(this.id);
      console.log(this.innerHTML);

      addFinishedLi(this.id, this.innerHTML, "doneList");
      // Remove from task list
      var el = document.getElementById(this.id);
      el.remove();
      // Remove from Local Storage
      localStorage.removeItem(this.id);
    });
  });

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

  count_finished++;
  document.getElementById("completed_task").innerHTML = count_finished + "/" + count_today;
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
    if(date === today)
    {
      addTaskLi(this.count, title, date, "todayList");
      var x = document.getElementById("collapseOne");
      x.classList.add("show");
      count_today++;
      document.getElementById("completed_task").innerHTML = count_finished + "/" + count_today;
    }
    else if (parseInt(cur_date[1]) + 1 === parseInt(task_date[1])) 
    {
      addTaskLi(this.count, title, date, "tomorrowList");
      var x = document.getElementById("collapseTwo");
        x.classList.add("show");
    }       
    addEvent();
  // Store
  window.localStorage.setItem(count, title + " " + date);
  }
}


function addTaskLi(count, title, date, list)
{
  var node = document.createElement("LI");
    node.setAttribute("id", count);
    node.setAttribute("class", "list-group-item");
    node.style.backgroundColor = "yellow";
    var textnode = document.createTextNode(title + " " + date);
    node.appendChild(textnode);
    document.getElementById(list).appendChild(node);
}


