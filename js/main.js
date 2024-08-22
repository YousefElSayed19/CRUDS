let title =document.getElementById("title");

let price =document.getElementById("price");

let taxes =document.getElementById("taxes");

let ads =document.getElementById("ads");

let descound =document.getElementById("descound");

let resultOfTotal =document.getElementById("resultOfTotal");

let category =document.getElementById("category");

let count =document.getElementById("count");

let create =document.getElementById("create");

let tbody =document.getElementById("tbody");

let bot =document.querySelector(".bot");

let searchField =document.getElementById("search");

let searchTitle =document.getElementById("searchTitle");

let searchCategory =document.getElementById("searchCategory");

let tmp;

let modeSearch='title';

function total(){
    if (price.value !=''){
        let result=0
        result = (+price.value + +taxes.value + +ads.value ) -descound.value
        resultOfTotal.innerHTML=result
        resultOfTotal.style.background="#0d6efd"
    }else{
        resultOfTotal.style.background="red"
    }
}

let arr;
if (localStorage.products){
    arr=JSON.parse(localStorage.products);
    showData()
    bot.style.display= 'block';
}else {
    arr=[]
    bot.style.display= 'none';
}

if (localStorage.products.length>2){
    arr=JSON.parse(localStorage.products);
    showData()
    bot.style.display= 'block';
}else {
    arr=[]
    bot.style.display= 'none';
}

function getData(){ 
    if (create.innerHTML==="Create"){
        if(title.value.length>0){
            let data={
                title: title.value.toLowerCase(),
                price : price.value,
                taxes : taxes.value,
                ads : ads.value,
                descound : descound.value,
                resultOfTotal : resultOfTotal.value,
                category : category.value.toLowerCase(),
            }
            if(+count.value>1){
                for (let i=0;i< +count.value;i++){
                    arr.push(data);
                }
            }else{
                arr.push(data);
            }
            localStorage.setItem("products",JSON.stringify(arr))
            showData()
            clearFields()
            if (arr.length>0){
                bot.style.display= 'block';
            }
        }else{
            alert("No Can Create Product Without Title !")
        }
    }else{
        arr[tmp].title=title.value
        arr[tmp].price=price.value
        arr[tmp].taxes=taxes.value
        arr[tmp].ads=ads.value
        arr[tmp].descound=descound.value
        arr[tmp].category=category.value
        arr[tmp].resultOfTotal=resultOfTotal.innerHTML
        localStorage.setItem("products",JSON.stringify(arr))
        showData()
        clearFields()    
        create.innerHTML='Create'
        create.classList.remove("mb-3")
        create.classList.remove("mt-3")
        count.style.display='block'
        search.style.display='block'
        searchTitle.style.display='block'
        searchCategory.style.display='block'
    }
}
function showData(){
    bot.innerHTML= `Delete All ( ${arr.length} ) `
    let table=''
    for(let i=0;i<arr.length;i++){
        table +=
        `
            <tr>
            <td>${i}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price==''? '-':arr[i].price }</td>
            <td>${arr[i].taxes==''? '-':arr[i].taxes }</td>
            <td>${arr[i].ads==''? '-':arr[i].ads }</td>
            <td>${arr[i].descound==''? '-':arr[i].descound }</td>
            <td>${(+(arr[i].price) + +(arr[i].taxes) + +(arr[i].ads)) - +(arr[i].descound)}</td>
            <td>${arr[i].category==''? '-':arr[i].category }</td>
            <td> 
            <button onclick="updataProducts(${i})">UPDATE</button>
            </td>
            <td>
            <button onclick="deleteProducts(${i})" class='delete'>DELETE</button>
            </td>
            </tr>
        `
    }
    tbody.innerHTML=table;
}

function clearFields(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    descound.value=''
    category.value=''
    count.value=''
    resultOfTotal.innerHTML=''
    resultOfTotal.style.background="red"
}
function deleteAll(){   
    arr.splice(0,arr.length)
    arr.length=0
    localStorage.clear()
    localStorage.setItem("products",JSON.stringify(arr))
    showData()
    bot.style.display= 'none';
}
function deleteProducts(i){
    if (arr.length<=2){
        bot.style.display= 'none';
    }
    arr.splice(i,1);
    localStorage.setItem("products",JSON.stringify(arr))
    showData()
}
function updataProducts(i){
    tmp=i
    create.innerHTML='Updata'
    create.classList.add("mb-3")
    create.classList.add("mt-3")
    count.style.display='none'
    search.style.display='none'
    searchTitle.style.display='none'
    searchCategory.style.display='none'
    scroll({
        top:0
    })
    title.value =arr[i].title
    price.value =arr[i].price
    taxes.value =arr[i].taxes
    ads.value =arr[i].ads
    descound.value =arr[i].descound
    category.value =arr[i].category
    resultOfTotal.innerHTML=(+(arr[i].price) + +(arr[i].taxes) + +(arr[i].ads))- +arr[i].descound
    resultOfTotal.style.background="#0d6efd"

}

function getSearchmode(id){
    if (id=='searchTitle'){
        modeSearch='title'
        searchField.placeholder="Search By Title."
    }else{
        modeSearch='category'
        searchField.placeholder="Search By Category."
    }
    searchField.focus()
}

function searchData(val){
    let table=''
    if(modeSearch=='title'){
        for(let i=0 ;i<arr.length;i++){
            if(arr[i].title.includes(val.toLowerCase())){
                table +=
                `
                    <tr>
                    <td>${i}</td>
                    <td><mark>${arr[i].title}</mark></td>
                    <td>${arr[i].price==''? '-':arr[i].price }</td>
                    <td>${arr[i].taxes==''? '-':arr[i].taxes }</td>
                    <td>${arr[i].ads==''? '-':arr[i].ads }</td>
                    <td>${arr[i].descound==''? '-':arr[i].descound }</td>
                    <td>${(+(arr[i].price) + +(arr[i].taxes) + +(arr[i].ads)) - +(arr[i].descound)}</td>
                    <td>${arr[i].category==''? '-':arr[i].category }</td>
                    <td> 
                    <button onclick="updataProducts(${i})">UPDATE</button>
                    </td>
                    <td>
                    <button onclick="deleteProducts(${i})" class='delete'>DELETE</button>
                    </td>
                    </tr>
                `
            }
        }
    }else{
        for(let i=0 ;i<arr.length;i++){
            if(arr[i].category.includes(val.toLowerCase())){
                table +=
                `
                    <tr>
                    <td>${i}</td>
                    <td>${arr[i].title}</td>
                    <td>${arr[i].price==''? '-':arr[i].price }</td>
                    <td>${arr[i].taxes==''? '-':arr[i].taxes }</td>
                    <td>${arr[i].ads==''? '-':arr[i].ads }</td>
                    <td>${arr[i].descound==''? '-':arr[i].descound }</td>
                    <td>${(+(arr[i].price) + +(arr[i].taxes) + +(arr[i].ads)) - +(arr[i].descound)}</td>
                    <td><mark>${arr[i].category==''? '-':arr[i].category }</mark></td>
                    <td> 
                    <button onclick="updataProducts(${i})">UPDATE</button>
                    </td>
                    <td>
                    <button onclick="deleteProducts(${i})" class='delete'>DELETE</button>
                    </td>
                    </tr>
                `
            }
        }
    }
    tbody.innerHTML=table;
}