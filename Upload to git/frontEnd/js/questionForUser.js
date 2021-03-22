let questionDiv = document.getElementById('quiz');
questionDiv.className = "question";
// let a = "A";
// let b = "B";
// let c = "C";
// let d = "D";
let listNum = [];
loadQuestionFromDB();
function loadQuestionFromDB(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://mtown.online/COMP351/labs/termProjectWrite",true);
    xhttp.send();
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            let myJson = JSON.parse(this.responseText);
            for(let i=0; i < myJson.length; i++){
                let myDiv = document.createElement('div'+myJson[i].quetionID);
                myDiv.id = "div" + myJson[i].quetionID;
                myDiv.value = myJson[i].answer;
                questionDiv.appendChild(myDiv);
                listNum.push(myJson[i].quetionID);
                add(myJson[i]);
            }
            console.log(listNum);
            loadAnswesfromDB(myJson);   
        }
    };
}
function loadAnswesfromDB(myJson02){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://mtown.online/COMP351/labs/termProject",true);
    xhttp.send();
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            
            let myJson = JSON.parse(this.responseText);
            for(let i=0; i < myJson.length; i++){
                addAns(myJson[i]);
            }
        }
    };
}
function addAns(myJson){
    let myDiv = document.getElementById('div'+myJson.quetionID);
    questionDiv.appendChild(myDiv);
    myDiv.appendChild(makeDiv(myJson.quetionID,myJson.ans,myJson.ansL));
}

function add(myJson){
    let myDiv = document.getElementById('div'+myJson.quetionID);
    questionDiv.appendChild(myDiv);
    myDiv.appendChild(makeDiv(myJson.quetionId,myJson.question));
}

function makeDiv(questionNum,text,letter=null){
    let myDiv = document.createElement('div');
    if(letter != null){
        myDiv.id = "q" + questionNum+letter;
        myDiv.appendChild(addRadio(questionNum,letter));
    } 
    myDiv.innerHTML+=text; 
    return myDiv;
}

function submit(){
    let questions = 0;
    for(let i = 0; i < listNum.length; i++){
        if(check(listNum[i])){
            questions++;
        }    
    }
    let myObj = document.getElementById("submit");
    myObj.remove();
    myObj = document.getElementById("finalScore");
    myObj.innerHTML = "You Got "+questions +"/"+listNum.length;
}

function check(num){
    let myQuestion = document.getElementById("div"+num);
    let correct = "correct";
    let wrong = "wrong";
    let check = "check";
    let q = "q";
    let letter = ["A","B","C","D","E","F","G","H","I","J","K"]
    for(i = 0; i < letter.length;i++){
        if(document.getElementById("r"+letter[i]+num).checked == true){
            let x = document.getElementById(q+num+letter[i]);
            if(myQuestion.value == letter[i]){
                x.className = correct;
                return true;
            }else{
                x.className = wrong;
                x=document.getElementById(q+num+myQuestion.value);
                x.className = check;
                return false;
            }
        }
    }
}

function addRadio(qNum,value){
    let radio = "radio";
    let para = document.createElement('input');
    para.type = radio;
    para.id = "r"+value+qNum;
    para.name = qNum;
    para.value = value;
    return para;
}