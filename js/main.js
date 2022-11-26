let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'Create';
let temp;
// get total
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//create product
let dataPro;
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro=[];
}

submit.onclick = function(){
    let newPro = {
    title:title.value ,
     price:price.value ,
     taxes:taxes.value ,
     ads:ads.value ,
     discount:discount.value,
     total:total.innerHTML,
     count:count.value,
     category:category.value,
    }
    if(title.value !='' && price.value !='' && category.value !='' && newPro.count < 100 ){
        if(mood ==='create'){
            if(newPro.count > 1){
                for(let i=0 ; i<newPro.count ;i++ ){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
            clearData();
        }else{
            dataPro[temp]=newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display ='block'
        }
      
     } 
    localStorage.setItem('product', JSON.stringify(dataPro));
     showData();
  }

// Clear inputs

function clearData(){
 title.value ='';
 price.value ='';
 taxes.value ='';
 ads.value ='';
 discount.value ='';
 total.innerHTML ='';
 count.value ='';
 category.value =''
}

//read

function showData(){
    getTotal()
 let table ='';
 for(let i=0 ;i<dataPro.length ; i++){
    table +=`
    <tr>
    <td>${i+1}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].ads}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
  <td><button onclick="updateData(${i})" id="update">update</button></td>
  <td><button id="delete" onclick="deletDate(${i})">delete</button></td>
</tr>
    `
 }

 document.getElementById('tbody').innerHTML=table;
 let btnDelete = document.getElementById("deleteAll")
 if(dataPro.length > 0){
   btnDelete.innerHTML =`
   <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
   `
 }else{
    btnDelete.innerHTML ='';
 }
}
showData();

//delete

function deletDate(index){
    dataPro.splice(index,1);
    localStorage.product = JSON.stringify(dataPro)
    showData();
}

// delete all
 function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
 }
//update

function updateData(index){
title.value = dataPro[index].title ;
price.value = dataPro[index].price ;
taxes.value = dataPro[index].taxes ;
ads.value = dataPro[index].ads ;
discount.value = dataPro[index].discount ;
getTotal()
count.style.display='none'
category.value = dataPro[index].category ;
submit.innerHTML ='Update';
mood = 'Update';
temp = index;
scroll({
    top:0,
    behavior:'smooth'
})
}

//search
let searchMood = 'title';
function getSearchMood(id)
{
    let search = document.getElementById('search');
 if(id == 'searchTitle'){ 
    searchMood = 'title';
 }else{
     searchMood = 'category';   
 }
 search.placeholder = 'Search By + searchMood';
 search.focus()
 search.value ='';
 showData();
 
}

function searchDate(value){
    let table='';
 if(searchMood == 'title')
 {
   for(let i=0; i<dataPro.length ; i++){
    if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
        table +=`
        <tr>
        <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button id="delete" onclick="deletDate(${i})">delete</button></td>
    </tr>
        `
       }
   }


 }else{
    for(let i=0; i<dataPro.length ; i++){
        if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
            table +=`
            <tr>
            <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button id="delete" onclick="deletDate(${i})">delete</button></td>
        </tr>
            `
           }
       }
 }
 document.getElementById('tbody').innerHTML=table;
}

//clean data
