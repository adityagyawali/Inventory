//random numbre genertor
function randomNumGenerator() {
  let randNum;
  let randNumGenerator = '';
  let numbersLetters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (let i = 0; i < 6; i++) {
    randNum = Math.floor(Math.random()*numbersLetters.length);
    randNumGenerator += numbersLetters[randNum];
    }
    return randNumGenerator;
  }

//time and date function
const displayTimeDate = function () {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let date = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();

  return date + '.' + month + '.' + year + " " + hour + ":" + minutes;
}

//empty array
const inventoryName = [];
let table = document.querySelector('#inventory');

function onAddButton() {

  //get input values
  let Id = document.querySelector('#random-number');
  let itemName = document.querySelector('#item-name');
  let itemQuantity = document.querySelector('#item-quantity');
  let itemPrice = document.querySelector('#item-price');
  let timeStamp = displayTimeDate();
  
 // form validation
  if (!itemName.value || !itemQuantity.value || !itemPrice.value) {
    alert('Please, Fill all the boxes');
    return false;
  } 

  //empty row is creted
  let newRow = table.insertRow();

  //creating cell
  let idCell = newRow.insertCell(0);
  let itemCell = newRow.insertCell(1);
  let quanityCell = newRow.insertCell(2);
  let priceCell = newRow.insertCell(3);
  let timeCell = newRow.insertCell(4);
  let actionCell = newRow.insertCell(5);

  itemCell.className = 'item-cell';
  quanityCell.className = 'quantity-cell';
  priceCell.className = 'price-cell';



    //pushing value to inventoryName arrya
    inventoryName.push({
          id: randomNumGenerator(),
          name : itemName.value,
           quantity: itemQuantity.value,
          price: itemPrice.value,
          time : displayTimeDate()
    });
    
    //showing values in the table
    inventoryName.forEach((item,i)=>{
      idCell.textContent = item.id;
      itemCell.textContent = item.name;
      quanityCell.textContent = item.quantity;
      priceCell.textContent = item.price;
      timeCell.textContent = item.time;
      actionCell.innerHTML = '<span title="Edit" class="ion-edit" onclick="onEdit(this)"></span><span title="Delete" class = "ion-trash-a" id="onDelete" onclick="removingRow(this)" ></span><span title="Completed" class="ion-close" id="toggle" onclick="toggle(this)"></span></br>';
    })


  //Empties the field after you add something
  itemName.value = '';
  itemQuantity.value = '';
  itemPrice.value = '';
 
}


const editInventory = (position, name, quantity, price) => {  //to edit name quantity and price in the array

  inventoryName[position].name = name;
  inventoryName[position].quantity = quantity;
  inventoryName[position].price = price;

};


function removingRow(target){
  var i = target.parentNode.parentNode.rowIndex;   //i gives the row inde
  inventoryName.splice(i - 1, 1);   //removes from array
  table.deleteRow(i);
}

//editing function

function onEdit(target) {
  let editables = target.parentNode.parentNode.childNodes;
  let position, name, quantity, price;
  position = parseInt(target.parentNode.parentNode.rowIndex) - 1;

  if (!editables[1].isContentEditable) {
    editables[1].contentEditable = 'true';
    editables[2].contentEditable = 'true';
    editables[3].contentEditable = 'true';
   
    target.style.color = '#0F0';
    target.title = "Update";

    editables[1].style.color = 'black';
    editables[2].style.color = 'black';
    editables[3].style.color = 'black';

    editables[1].style.backgroundColor = '#aed5e8';
    editables[2].style.backgroundColor = '#aed5e8';
    editables[3].style.backgroundColor = '#aed5e8';
    
  } else {
   
    name = editables[1].textContent;
    quantity = editables[2].textContent;
    price = editables[3].textContent;
    editInventory(position,name,quantity,price);
    editables[1].contentEditable = 'false';
    editables[2].contentEditable = 'false';
    editables[3].contentEditable = 'false';
    
    target.style.color = '#000000';
    target.title = 'Edit',
    

    editables[1].style.backgroundColor = '#EBEDF6';
    editables[2].style.backgroundColor = '#EBEDF6';
    editables[3].style.backgroundColor = '#EBEDF6';
    
    editables[1].style.color = 'black';
    editables[2].style.color = 'black';
    editables[3].style.color = 'black';
    
  }
  
}

//to check if they are toggled
function toggle(target) {
    let totalCompleted = 0;
    let inventoryLength = inventoryName.length;
    inventoryName.forEach((item) => {
      if (item.completed === true) {
        totalCompleted++;
      }
    });
    
    for (let i = 0; i < inventoryLength; i++) {
      if (totalCompleted === inventoryLength) {
        inventoryName[i].completed = false;
        target.title = 'Completed';
       target.className = 'ion-close';
       target.color = '#000';
        
      } else {
        for (let i = 0; i < inventoryLength; i++) {
          inventoryName[i].completed = true;
          target.title = 'Uncomplete';
         target.className = 'ion-ios-checkmark';
         target.style.color = '#384E72';
        }
      }

    }
    
  }
  

    
  


