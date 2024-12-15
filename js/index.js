let pName = document.getElementById('proName');
let pPrice = document.getElementById('proPrice');
let pCat = document.getElementById('proCat');
let pDesc = document.getElementById('proDesc');
let pImg = document.getElementById('proimg');
let updateBtn = document.getElementById('update')
let addBtn = document.getElementById('add');
let counter=document.getElementById('counter');
let searchBar=document.getElementById('searchName');
let warn = document.getElementById('warn');
let productSec = document.getElementById('product');
let inputSec = document.getElementById('input');
let homeSec = document.getElementById('home');
let row = document.getElementById('row');
let allProducts = [];
var theInd;


if (localStorage.length != 0) {
    allProducts = JSON.parse(localStorage.getItem('products'))
    display()
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function saveItem() {


    if (validation(pName) & validation(pPrice) & validation(pCat) & validation(pDesc)) {
        let oneProduct = {
            name: pName.value,
            price: pPrice.value,
            cat: pCat.value,
            desc: pDesc.value,
            img: pImg.files[0]?.name
        }
        allProducts.push(oneProduct);
        localStorage.setItem("products", JSON.stringify(allProducts));
        toastr.success('new product added')
        display();
        clearInputs();
    }
}



function display() {
    let content = '';
    for (let i = 0; i < allProducts.length; i++) {
        content += `
    <div class="col-lg-4">
        <div class="div position-relative">
            <div class="card">
                <img src="./images/${allProducts[i].img}" class="img-fluid"  alt="${allProducts[i].desc}">
                <div class="card-body">
                    <span class="cat position-absolute">${allProducts[i].cat}</span>
                    <h3 class="card-title">${allProducts[i].name}</h3>
                    <h5 class="card-title">${allProducts[i].price} <span class="text-success">EGP</span> </h5>
                    <p class="card-text">${allProducts[i].desc}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button onclick="updatePro(${i})" type="button" class="btn btn-warning"> <i class="fa-regular fa-pen-to-square"> </i></button>
                    <button onclick="deletePro(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    </div>
    `
    }
    row.innerHTML = content;
    counter.innerHTML = `Total : ${allProducts.length}`;

}


function searchName(value){
    let content = '';
    let x= 0;
    for (let i = 0; i < allProducts.length; i++) {
        if( (allProducts[i].name).toLowerCase().startsWith(value.toLowerCase())  ){
        content += `
    <div class="col-lg-4">
        <div class="div position-relative">
            <div class="card">
                <img src="./images/${allProducts[i].img}"  alt="${allProducts[i].desc}">
                <div class="card-body">
                    <span class="cat position-absolute">${allProducts[i].cat}</span>
                    <h3 class="card-title">${allProducts[i].name}</h3>
                    <h5 class="card-title">${allProducts[i].price} <span class="text-success">EGP</span> </h5>
                    <p class="card-text">${allProducts[i].desc}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button onclick="updatePro(${i})" type="button" class="btn btn-warning"> <i class="fa-regular fa-pen-to-square"> </i></button>
                    <button onclick="deletePro(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    </div>
    `
    x++;
}
}
    row.innerHTML = content;
    counter.innerHTML = `Total : ${x}`;
}

function searchPrice(value){
    console.log(value);
    
    let content = '';
    let x= 0;
    for (let i = 0; i < allProducts.length; i++) {
        if( (allProducts[i].price).startsWith(value)  ){
        content += `
    <div class="col-lg-4">
        <div class="div position-relative">
            <div class="card">
                <img src="./images/${allProducts[i].img}"  alt="${allProducts[i].desc}">
                <div class="card-body">
                    <span class="cat position-absolute">${allProducts[i].cat}</span>
                    <h3 class="card-title">${allProducts[i].name}</h3>
                    <h5 class="card-title">${allProducts[i].price} <span class="text-success">EGP</span> </h5>
                    <p class="card-text">${allProducts[i].desc}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button onclick="updatePro(${i})" type="button" class="btn btn-warning"> <i class="fa-regular fa-pen-to-square"> </i></button>
                    <button onclick="deletePro(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    </div>
    `
    x++;
}
}
    row.innerHTML = content;
    counter.innerHTML = `Total : ${x}`;
}

function updatePro(index) {
    theInd = index;

    pName.value = allProducts[index].name;
    pPrice.value = allProducts[index].price;
    pCat.value = allProducts[index].cat;
    pDesc.value = allProducts[index].desc;

    updateBtn.classList.remove('d-none')
    addBtn.classList.add('d-none')
    warn.classList.remove('d-none')

}
function update() {
    warn.classList.add('d-none')
    allProducts[theInd].name = pName.value;
    allProducts[theInd].price = pPrice.value;
    allProducts[theInd].cat = pCat.value;
    allProducts[theInd].desc = pDesc.value;
    if (pImg.files[0]) {
        allProducts[theInd].img = pImg.files[0]?.name
    } else {
        allProducts[theInd].img = allProducts[theInd].img
    }
    addBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
    localStorage.setItem("products", JSON.stringify(allProducts));
    display();
    clearInputs()
}
function deletePro(index) {
    allProducts.splice(index, 1)
    localStorage.setItem('products', JSON.stringify(allProducts))
    display()

}

function clearInputs() {
    pName.value = null;
    pPrice.value = null;
    pCat.value = null;
    pDesc.value = null;
    pImg.value = null
    pName.classList.remove('is-valid');
    pName.classList.remove('is-invalid');

    pPrice.classList.remove('is-valid');
    pPrice.classList.remove('is-invalid');

    pCat.classList.remove('is-valid');
    pCat.classList.remove('is-invalid');

    pDesc.classList.remove('is-valid');
    pDesc.classList.remove('is-invalid');

    pImg.classList.remove('is-valid');
    pImg.classList.remove('is-invalid');

}

function showHome() {
    homeSec.classList.remove('d-none');
    productSec.classList.add('d-none');
    inputSec.classList.add('d-none');
}
function showInput() {
    inputSec.classList.remove('d-none');
    productSec.classList.add('d-none');
    homeSec.classList.add('d-none');
}
function showProduct() {
    productSec.classList.remove('d-none');
    inputSec.classList.add('d-none');
    homeSec.classList.add('d-none');
}


function validation(input) {
    var regex = {
        proName: /^[A-Z]\w{2,}$/,
        proPrice: /^[1-9]\d{2,}$/,
        proCat: /^[A-Z].{1,}$/,
        proDesc: /^.{3,}$/,
        proimg:/^.{1,}\.(jpg|jpeg|png|svj)$/
    }
    if (regex[input.id].test(input.value)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        input.nextElementSibling.classList.add('d-none');
        return true;
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.nextElementSibling.classList.remove('d-none');
        return false;
    }


}