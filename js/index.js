var registeredId = [];
var values = []
var globalstart = new Date();
var globalTimer = 0;

setInterval(function(){
    globalTimer = Math.round((new Date - globalstart) / 1000 );
  }, 1000);

function solution(){
  let filterValue = $("#filter").val();
  let hasSignedIn = {};
  let solutionValues = [];

  $("#indicative").text("Time Greater Than " + filterValue);

  for(data in values){
    entry = values[data].split(" ");
    user = entry[0];
    time = parseInt(entry[1]);
    if(user in hasSignedIn){
      delta = Math.abs(time - hasSignedIn[user]);
      if(delta > filterValue){
        console.log(delta);
        solutionValues.push(user);
      }
    }else{
      hasSignedIn[user] = time;
    }
  }

  displayResult(solutionValues);

}

function addNew(){
  let userId = $("#user_id").val();

  if(registeredId.includes(userId)){
    alert("Repeated Id!");
  }else{
    $("#input").append("<tr id='datauser"+userId+"'><td>"+userId+"</td><td id='timer"+userId+"'>0 Seconds</td><td><button class='btn btn-danger' onclick='logOut(\""+userId+"\")'>Sign-Out</button></td></tr>");
    let start = new Date();
    let newData = userId+" "+globalTimer+" sign-in"
    values.push(newData);
    $("#dataEntry").append("<tr><td>"+newData+"</td></tr>");
    registeredId.push(userId);
    timer(start,userId);
  }
}

function timer(start, userId){
  setInterval(function(){
    $('#timer'+userId).text(Math.round((new Date - start) / 1000 )+ " Seconds");
  }, 1000);
}

function logOut(user){
  let sesTime = $("#timer"+user).html();
  $("#logoutValues").append("<tr><td>"+user+"</td><td>"+sesTime+"</td></tr>");

  let newData = user+" "+globalTimer+" sign-out"
  $("#datauser"+user).remove();
  values.push(newData);
  $("#dataEntry").append("<tr><td>"+newData+"</td></tr>");
}

function displayResult(solutionValues){
  let htmlString = "";
  for(res in solutionValues){
    htmlString += "<tr><td>"+solutionValues[res]+"</td></tr>";
  }
  $("#solutionValues").html(htmlString);
}


