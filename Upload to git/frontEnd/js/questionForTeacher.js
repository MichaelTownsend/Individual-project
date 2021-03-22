let bQuestionNum = 0;
loadQuestionFromDB();

function loadQuestionFromDB(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://mtown.online/COMP351/labs/termProjectWrite",true);
    xhttp.send();
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            
            let myJson02 = JSON.parse(this.responseText);
            for(let i=0; i < myJson02.length; i++){
                
                loadQuestions(myJson02[i]);
            }
            loadAnswesfromDB(myJson02);
             
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
                
                addAns(myJson[i].quetionID,myJson[i].ansL);
                loadAns(myJson[i]);
            }
            for(let i=0; i < myJson02.length; i++){
                
                addBut(myJson02[i]);
                document.getElementById("r"+document.getElementById("div"+myJson02[i].quetionID).value+myJson02[i].quetionID).checked = true;
            } 
            deleteB('add');
            document.body.appendChild(addButton("add",bQuestionNum));
        }
    };
}

function loadQuestions(myJson){
    let myDiv = document.createElement('Div');
    myDiv.id = "Div"+myJson.quetionID;
    
    add(myJson.quetionID);
    load(myJson);
    document.getElementById("div"+myJson.quetionID).appendChild(myDiv)
    if(myJson.quetionID >= bQuestionNum){
        bQuestionNum = myJson.quetionID;
        bQuestionNum++;
    } 
}
function addBut(myJson){
    let myDiv = document.getElementById("div"+myJson.quetionID);
    myDiv.appendChild(addButton("save",myJson.quetionID));
    myDiv.appendChild(addButton("delete",myJson.quetionID));
    myDiv.appendChild(addButton("addO",myJson.quetionID));
}
function addAns(questionNum= bQuestionNum,letter){
    let myDiv = document.getElementById("Div"+questionNum);
    myDiv.appendChild(addRadio(questionNum,letter));
    addTextFeildHelper(letter+questionNum,myDiv);
    //bQuestionNum++;
}
function loadAns(myJson){
    document.getElementById(myJson.ansL+myJson.quetionID).value =myJson.ans;
    
    
}
function add(questionNum= bQuestionNum){
    let myDiv = document.createElement('div');
    myDiv.id = "div"+questionNum;
    myDiv.className = "questions";
    document.body.appendChild(myDiv);
    myDiv.appendChild(newLine());
    addTextFeildHelper(questionNum,myDiv);
    bQuestionNum++;
}
function load(myJson){
    document.getElementById(myJson.quetionID).value = myJson.question;
    document.getElementById("div"+myJson.quetionID).value = myJson.answer;
}
function loadHelper(i,myQuestion){
    if(i == 0){
        return myQuestion.a;
    }else if(i == 1){
        return myQuestion.b;
    }else if(i == 2){
        return myQuestion.c;
    }else if(i == 3){
        return myQuestion.d;
    }
}
function edit(qNum){
    let myQuestion = checkForAnswer(qNum);
    
    
    let myJson = JSON.stringify(myQuestion);
    sendEdit(myJson);
}

function sendEdit(myJson){
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST','https://mtown.online/COMP351/labs/termProjectWrite',true);
    xhttp.setRequestHeader('Content-Type', 'text/html');
    xhttp.send(myJson);
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText) ;
        }
    }
}
function checkForAnswer(qNum){
    let myQuestion = {
        quetionID: qNum,
        questNum : 4,
        question:document.getElementById(qNum).value,
    };
    let index = ["A","B","C","D","E","F","G","H","I","J","k"];
    let f = 0;
    for (let i = 0; i < index.length; i ++){
        if(document.getElementById("r"+index[i]+qNum)){
            f++;
            myQuestion[index[i].toLowerCase()] = document.getElementById(index[i]+qNum).value
            if(document.getElementById("r"+index[i]+qNum).checked == true){
                myQuestion["answer"]= document.getElementById("r"+index[i]+qNum).value;
            }
        }  
    }
    myQuestion["questNum"]=f;
    return myQuestion;
}

function addTextFeildHelper(i,myDiv){
    myDiv.appendChild(addTextFeild(i));
    myDiv.appendChild(newLine());
}
function addRadio(qNum,value){
    let para = document.createElement('input');
    para.type = "radio";
    para.id = "r"+value+qNum;
    para.name = qNum;
    para.value = value;
    return para;
}
function addButton(button,num){
    let para = document.createElement('button');
    para.type = "button";
    para.id = button;
    para.onclick = function(){
        if(para.id == "save"){
            edit(num);
        }else if(para.id == "delete"){
            deleteE("div",num);
        }else if(para.id == "add"){
            add(num+1);
            let myDiv = document.createElement('Div');
            myDiv.id = "Div"+(num+1);
            document.getElementById("div"+(num+1)).appendChild(myDiv)
            addAns(num+1,"A");
            addAns(num+1,"B");
            myDiv2 = document.getElementById("div"+(num+1))
            myDiv2.appendChild(addButton("save",num+1));
            myDiv2.appendChild(addButton("delete",num+1));
            myDiv2.appendChild(addButton("addO",num+1));
            deleteB("add");
            document.body.appendChild(addButton("add",bQuestionNum));
            bQuestionNum++
        }else if(para.id == "addO"){
            
            let index = ["A","B","C","D","E","F","G"];
            for(i = 0 ; i < index.length; i++){
                if(!document.getElementById(index[i]+num)){
                    
                    addAns(num,index[i]);
                    break;
                }
            }
        }
        
    };
    para.innerText = button;
    return para;

}
function deleteB(num){
    let myobj = document.getElementById(num);
    myobj.remove();
}
function deleteE(ele,num){
    let myQuestion = {
        quetionID: num,
    }
    let myJson = JSON.stringify(myQuestion);
    deleteB(ele+num);
    console.log("sending delete request");
    const xhttp = new XMLHttpRequest();
    xhttp.open('PUT','https://mtown.online/COMP351/labs/termProjectWrite',true);
    xhttp.setRequestHeader('Content-Type', 'text/html');
    xhttp.send(myJson);
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText) ;
        }
    };
        
}
function addTextFeild(name){
    let para = document.createElement("input");
    para.type = "text";
    para.id = name;
    return para;
}
function newLine(){
    let para = document.createElement('br');
    return para;
}