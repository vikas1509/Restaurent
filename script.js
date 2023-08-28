document.addEventListener("DOMContentLoaded",()=>{
    getMenu();
    document.getElementById("place-order").addEventListener("click", mainFunction())
})
function getMenu(){ 

    const foodList = document.getElementById("food-list");
    fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
    .then(response=>response.json())
  .then( (data)=>{
         data.forEach(item =>{
            let foodItem = document.createElement('div');
            foodItem.innerHTML=`
            <img src="${item.imgSrc}" alt="${item.name}" height="200px" width>
            <h1>${item.name}</h1>
            <h4>${item.price}</h4>

            `
            foodList.appendChild(foodItem);
         })
  }
  )

   
}

function payOrder(){}

function thankYou(){
    alert("thank you");
}
function orderPrep(){

}
function orderPrep() {
    return new Promise((resolve, reject)=>{

        setTimeout(()=>{
console.log({order_status:true, paid:false});
resolve({order_status:true,paid:false});

        },1500)
    })
}


function getRandomFood(data){
    const all_food = data;
const order = [];

for(let i =0; i<3;i++){
     let ri = Math.floor(Math.random()*all_food.length);

     order.push(data[ri]);
}
   return order ; 
}

function takeOrder(data){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
        const order = getRandomFood(data);

resolve(order);

        },2500)
    })

}

function payOrder() {
    return new Promise((resolve, reject)=>{

        setTimeout(()=>{
console.log({order_status:true, paid:false});
resolve({order_status:true,paid:true});

        },1500)
}
)}


function mainFunction(){
    console.log('sciptcalled');
    fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
    .then(response=>response.json())
  .then(data=>takeOrder(data))
    .then(order=> {
        console.log(order);
        return order;
    })
    .then((order)=>orderPrep(order))
    .then((status)=>{
        if(status.order_status){
            return payOrder();
        }
    })
    .then((status)=>{
if(status.paid){
    thankYou();
}
else{
    throw new Error("payment decline/failed");

}
    })
    .catch((err)=> console.log(err));


}
