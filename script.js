const smtbtn=document.getElementById("submit");
const tierInput=document.getElementById("tier");
const itemContainers=document.getElementsByClassName('item-container');

const tierLists=document.querySelectorAll('.tier-list');

let currentDrag;
for(const itemContainer of itemContainers){
    // setUpItemContainerForDrag(itemContainer);
       setUpItemContainerForDrag(itemContainer);
}
const imgform=document.getElementById("img-form")
imgform.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log("imge form is submitted");
    const imgItemInput=document.getElementById("item");
    const imgUrl=imgItemInput.value;
    if(imgUrl==''){
        alert("please enter a valid url");
        return;
    } 
    console.log(imgUrl);
    createImgItem(imgUrl);
    imgItemInput.value='';
})

function createImgItem(imgUrl){
    const imgDiv=document.createElement("div");
    imgDiv.classList.add("item-container")
    imgDiv.setAttribute('draggable','true');
    const imgTag=document.createElement("img");
    imgTag.src=imgUrl;
   
    imgDiv.appendChild(imgTag);
    const nonTierSection=document.getElementById("non-tier-section");
    nonTierSection.appendChild(imgDiv);
    setUpItemContainerForDrag(imgDiv);
}
smtbtn.addEventListener('click',(event)=>{
    console.log(event.target);
    event.preventDefault();
    if(tierInput.value==''){
        alert("please enter a tier name");
        return;
    }
    createList(tierInput.value);
    tierInput.value='';
})


function createList(listName){
    const newList=document.createElement("div");
    newList.classList.add("tier-list")

    const heading=document.createElement("div");
    heading.classList.add('heading');
    const textCont=document.createElement('div');
    textCont.textContent=listName;
    heading.appendChild(textCont);
    const newListItem=document.createElement("div")
    newListItem.classList.add("tier-list-item")

    newList.appendChild(heading);
    newList.appendChild(newListItem);

    const tierSection=document.getElementById("tier-list-section")
    tierSection.appendChild(newList);
    setUpDrop(newListItem);
}

function setUpItemContainerForDrag(itemContainer){
    itemContainer.addEventListener('dragstart',(event)=>{
        currentDrag=event.target.parentNode;

    })
    itemContainer.addEventListener('dblclick',(event)=>{
        const parentNode=event.target.parentNode;
        const nonTierSec=document.getElementById('non-tier-section');
        nonTierSec.appendChild(parentNode);
    })
}

function setUpDrop(tierListItem){
    console.log(tierListItem);
    tierListItem.addEventListener('drop',(event)=>{
        event.preventDefault();
    })
    tierListItem.addEventListener('dragover',function (event){
        console.log("dragged over a drop zone");
       if(this!==currentDrag.parentNode){
         this.appendChild(currentDrag);
       }
    })
}