let title = document.getElementById("title");
let desc = document.getElementById("description");

let child2 = document.getElementById("child2")

// Render data with using localStorage... 
function localData(){
    
        let data = JSON.parse(localStorage.getItem("list"));

        if(data !== null){
            data.forEach((e)=>{

            let div = document.createElement("div")

            if(e.comp === 1){
                div.className = "listItems complete";
            }else{
                div.className = "listItems";
            }         

            div.id = e.index;

            let h5 = document.createElement("h5")
            let p = document.createElement("p")
            p.className = "description";

            let span1 = document.createElement("span");
            span1.className = "delSpan"
            span1.innerHTML = "<i class='fa fa-trash-o del' onclick='delNote(this)'></i>";

            let span2 = document.createElement("span");
            span2.className = "compSpan"
            span2.innerHTML = "<i class='fa fa-check comp' onclick='compNote(this)'></i>";

            let span3 = document.createElement("span");
            span3.className = "date"
            span3.innerText = e.storeDate

            h5.innerText = e.title;
            p.innerText = e.desc;

            div.appendChild(span1);
            div.appendChild(span2);
            div.appendChild(h5);
            div.appendChild(p);
            div.appendChild(span3);
            child2.appendChild(div);

        })
    }  
}

localData();


// Add Todo...
function addTodo (){

    if(title.value !== "" && desc.value !== ""){
        addNew(title.value,desc.value);
    }
    title.value = ""
    desc.value = ""
}

// Add New Todo...
const addNew = (title,desc)=>{

    // Get localStorage size & assign (index & id) by that...
    let dataSize = JSON.parse(localStorage.getItem("list"));
    let size = 0;
    if(dataSize !== null){
        size = dataSize.length;
    }else{
        size = 0;
    }

    // Store in localStorage...
    let date = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let data ={
        title: title,
        desc: desc,
        index: "list"+size,
        comp: 0,
        storeDate: days[date.getDay()] +" - "+ date.getDate() +"/"+ (parseInt(date.getMonth())+1) +"/"+ date.getFullYear()
    }

    if(localStorage.getItem("list")==null){
        localStorage.setItem("list",'[]');
    }
    let oldData = JSON.parse(localStorage.getItem("list"));

    oldData.push(data)
    localStorage.setItem("list",JSON.stringify(oldData));


    // Create internal elements & add on...
    let div = document.createElement("div")
    div.className = "listItems";
    div.id = "list" + size;

    let h5 = document.createElement("h5")
    let p = document.createElement("p")
    p.className = "description";

    let span1 = document.createElement("span");
    span1.className = "delSpan"
    span1.innerHTML = "<i class='fa fa-trash-o del' onclick='delNote(this)'></i>";

    let span2 = document.createElement("span");
    span2.className = "compSpan"
    span2.innerHTML = "<i class='fa fa-check comp' onclick='compNote(this)'></i>";

    let span3 = document.createElement("span");
    span3.className = "date"
    span3.innerText = days[date.getDay()] +" - "+ date.getDate() +"/"+ (parseInt(date.getMonth())+1) +"/"+ date.getFullYear()

    h5.innerText = title;
    p.innerText = desc;

    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(h5);
    div.appendChild(p);
    div.appendChild(span3);
    child2.appendChild(div);
}

// Delete Todo...
function delNote(e){
    let span = e.parentElement;
    let div = span.parentElement;
    let child2 = div.parentElement;
    child2.removeChild(div);
    let delId = span.parentElement.id;

    let dataInLocal = JSON.parse(localStorage.getItem("list"));

    if(dataInLocal!==null){
        let filterData = dataInLocal.filter((e) => {return e.index !== delId});
        localStorage.setItem("list",JSON.stringify(filterData))
    }
}

// Mark Complete Todo...
function compNote(e){

    let span = e.parentElement;
    let divID = span.parentElement.id;
    let comp = document.getElementById(divID);

    comp.classList.toggle("complete");
    
    if(comp.classList[1]==="complete"){
        updateLocalData(1,divID)
    }else{
        updateLocalData(0,divID)
    }
}

let updateLocalData = (modifyNo,divID)=>{
    let localData = JSON.parse(localStorage.getItem("list"));
    localData.forEach((e)=>{
        if(divID === e.index){
            e.comp = modifyNo
            localStorage.setItem("list",JSON.stringify(localData))
        }
    })
}

