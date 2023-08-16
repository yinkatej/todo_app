const form = document.getElementById('form');
const text = document.getElementById('item');
let itemsList = document.getElementById('items-list');
// text.value=''
console.log(typeof(text.value))
let arrayItems =[]

try{arrayItems = [...JSON.parse(localStorage.getItem('item'))];}
catch (error){
    console.log(error)
}


const updateUI = (e)=>{
    try {   
        const el = document.createElement('li') ;     
        el.innerHTML=  `<div class="display">
        <div class="inner">
        <input type="checkbox" class="box"value="1">
        <div class="h"><h3>${e}</h3></div class="h">
        </div>
        <button class="edit">Edit</button>
        <button class="del">Delete</button>
        </div>`
        itemsList.appendChild(el)
        

       
        
    } catch (error) {
        
    }
    
}
function delet (index){
    const list = document.getElementById('items-list')
    console.log(list.children)
    list.removeChild(list.children[index])
        
    
    
}
const check = ()=>{
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    const edit = document.getElementsByClassName('edit');
    const del = document.getElementsByClassName('del');
    // console.log(checkbox);
   
    [...itemsList.children].map((e, i)=>{
        [...checkbox][i].addEventListener('change',()=>{
            arrayItems[i] ={...arrayItems[i], checked:!(arrayItems[i].checked)}
            // arrayItems = [...arrayItems, arrayItems[i]]
            localStorage.setItem('item', JSON.stringify(arrayItems))
            // console.log(arrayItems)
        });
        const li = document.getElementsByTagName('li');
        [...edit][i].addEventListener('click', ()=>{
            if (text.value=='')
           {    text.value = arrayItems[i].item
                e.remove()   
                arrayItems=[...arrayItems.filter(e=>e!=arrayItems[i])]
                localStorage.setItem('item', JSON.stringify(arrayItems))
                console.log(arrayItems)
            }        
        });
        
        [...del][i].addEventListener('click', ()=>{
           e.remove()
           arrayItems=[...arrayItems.filter(e=>e!=arrayItems[i])]
           localStorage.setItem('item', JSON.stringify(arrayItems))
           console.log(JSON.getItem('item'))
        })
        
          
    })
    // arrayItems=[...arrayItems, arrayItems.filter(e=>e!=arrayItems[i])]
    //          localStorage.setItem('item', JSON.stringify(arrayItems))
}

// localStorage.setItem('item', arrayItems)
try {
    const item = (localStorage.getItem('item'));
    JSON.parse(item).map(e=>{
        updateUI(e.item)
    })
    const checkbox = document.querySelectorAll('input[type="checkbox"')
    // console.log(checkbox)
    arrayItems.map((e,i)=>{
        if (e.checked) [...checkbox][i].checked = true 
    })

} catch (error) {
    console.log(error)
}

check();




form.addEventListener('submit', e=>{
    e.preventDefault();

    arrayItems = [...arrayItems, {id: arrayItems.length, item:text.value, checked:false}]
    localStorage.setItem('item', JSON.stringify(arrayItems))
    console.log(localStorage.getItem('item'))
    updateUI(text.value)
    text.value =''
    check()
   
   
    
})


