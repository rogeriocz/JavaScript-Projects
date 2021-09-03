const bPrev = document.querySelector("#bPrev");
const bNext = document.querySelector("#bNext");
const items = document.querySelectorAll("#slider-container .item");

console.log(items);

let index = 0;
const total = items.length;

console.log(total);
mostrarItems(index);

bPrev.addEventListener("click", (e) => {
  if(index > 0){
      index--;
      ocultarItems();
      mostrarItems(index);
  }
});

bNext.addEventListener("click", (e) => {
  if(index < total -1 ){
      index++;
      ocultarItems();
      mostrarItems(index);
  }
});

function mostrarItems(index){
    items[index].classList.add('item-active');
}

function ocultarItems(){
    items.forEach(item => {
        item.classList.remove('item-active');
    })
}