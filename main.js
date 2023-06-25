


var list = JSON.parse(localStorage.getItem('list') || '[]')
var nav = document.querySelectorAll('.nav li')
var show_itens = document.querySelector('.tareas-ul')
var page_all = document.querySelector('.page_all')
var page_active = document.querySelector('.page_active')
var page_completed = document.querySelector('.page_completed')


nav.forEach((e)=>{
    e.addEventListener('click',(el)=>{
        
        var teste = document.querySelectorAll('.nav li')
        teste.forEach((i)=>{
            i.classList.remove('active')
        })
        el.target.classList.add('active')
        if(el.target.classList.contains('completed')){
            page_all.classList.add('page_hide')
            page_active.classList.add('page_hide')
            page_completed.classList.remove('page_hide')

            completed()
            

            var itens = JSON.parse(localStorage.getItem('list'));
            var filter = itens.filter(e => e.status == 'actived')
            
            if (filter.length <= 0) {
                document.querySelector('.removeAll').classList.add('remove_hide')
            }else{
                document.querySelector('.removeAll').classList.remove('remove_hide')
            }
          
           
           
            document.querySelector('.agregar').classList.remove('show_agregar')
           
        } else if (el.target.classList.contains('actived')) {
            page_all.classList.add('page_hide')
            page_active.classList.remove('page_hide')
            page_completed.classList.add('page_hide')
            actived()
            

            document.querySelector('.agregar').classList.add('show_agregar')
            
        }else if (el.target.classList.contains('all')){
            page_all.classList.remove('page_hide')
            page_active.classList.add('page_hide')
            page_completed.classList.add('page_hide')
            all()
            
            document.querySelector('.agregar').classList.add('show_agregar')
           
        }
        
        
    })
})







var btn = document.querySelector('.boton-class')
var input = document.querySelector('.barra')
btn.addEventListener('click',(e)=>{
    var list = JSON.parse(localStorage.getItem('list') || '[]')
    var value = input.value.trim()
    if (value != ""){

        var filter = list.find(e=> e.name == value)
      
        if (filter == undefined){
            var data = {
                "name": value,
                "status": "inactived"
            }

            list = [...list, data]
            localStorage.setItem('list', JSON.stringify(list))

            all()
            actived()
            document.querySelector('.barra').value = ""
        }else{
            alert(`${value} já existe, digite um outro nome.`)
            document.querySelector('.barra').value = ""
        }
        

    }else{
        alert('Digite um nome')
    }
})


function all(){
    var all_items = document.getElementById('page_all')
    var itens_alls = JSON.parse(localStorage.getItem('list'));
    var template = '';
    itens_alls.forEach((e) => {
        template += `
      <li>
        <div class="list_btn">
          <input type="radio" name="" value="${e.name}" id="${e.name}" ${e.status == 'actived' ? 'checked' : ''
            }>
           <label for="${e.name}">${e.name}</label>
        </div>
      </li>
    `;
    });
    all_items.innerHTML = template;


    var lists_actived = page_all.querySelectorAll('ul li .list_btn input');
    
    lists_actived.forEach((e) => {
        e.addEventListener('click', (el) => {
            var renameObject = itens_alls.find(function (object) {
                return object.name === el.target.value;
            });

            if (renameObject) {
                renameObject.status = 'actived';
                localStorage.setItem('list', JSON.stringify(itens_alls));
                all();
            }
         
        });
    });
}
all()

function actived() {
    var all_items = document.getElementById('page_active')
    var itens_actived = JSON.parse(localStorage.getItem('list'));
    var filter = itens_actived.filter(e => e.status == 'inactived')
    if (filter !== undefined){

   
    var template = '';
    filter.forEach((e) => {
        
  
        template += `
      <li ${e.status == 'actived' ? `class=${e.status}` : `class=${e.status}`}>
        <div class="list_btn">
          <input type="radio" name="" value="${e.name}" id="${e.name}" ${e.status == 'actived' ? 'checked' : ''
            }>
           <label for="${e.name}">${e.name}</label>
        </div>
      </li>
    `;
    });
    all_items.innerHTML = template;

    var lists_actived = page_active.querySelectorAll('ul li .list_btn input');

    lists_actived.forEach((e) => {
        e.addEventListener('click', (el) => {
            var renameObject = itens_actived.find(function (object) {
                return object.name === el.target.value;
            });

            if (renameObject) {
                renameObject.status = 'actived';
                localStorage.setItem('list', JSON.stringify(itens_actived));
                actived();
            }

        });
    });

    }
}
actived()




function completed() {
    var all_items = document.getElementById('page_completed')
    var itens_completed = JSON.parse(localStorage.getItem('list'));
    var filter = itens_completed.filter(e => e.status == 'actived')
    if(filter !== undefined){

   
    var template = '';
    filter.forEach((e) => {
        template += `
      <li ${e.status == 'actived' ? `class=${e.status}` : `class=${e.status}`}>
        <div class="list_btn">
          <input type="radio" name="" value="${e.name}" id="${e.name}" ${e.status == 'actived' ? 'checked' : ''
            }>
           <label for="${e.name}">${e.name}</label>
        </div>
        <div class="del" data-name="${e.name}">
           <i class="fas fa-trash" data-name="${e.name}"></i>
        </div>
      </li>
    `;
    });
    all_items.innerHTML = template;

    var lists_del = page_completed.querySelectorAll('li .del');

    lists_del.forEach((e) => {
        e.addEventListener('click', (el) => {
            var getName = el.target.getAttribute('data-name')

            var objetoRemover = { name: getName };

            itens_completed = itens_completed.filter(function (objeto) {
                return objeto.name !== objetoRemover.name;
            });

           
            localStorage.setItem('list', JSON.stringify(itens_completed));
            completed();

            var itens_completed_2 = JSON.parse(localStorage.getItem('list'));
            var filter_2 = itens_completed_2.filter(e => e.status == 'actived')

            if (filter_2.length <= 0) {
                document.querySelector('.removeAll').classList.add('remove_hide')
            }else {
                document.querySelector('.removeAll').classList.remove('remove_hide')
            }

            

        });

        document.querySelector('.removeAll').addEventListener('click', () => {
          

            var itens_completed_3 = JSON.parse(localStorage.getItem('list'));
           
            var filter_del = itens_completed_3.filter(e => e.status !== "actived")
            localStorage.setItem('list', JSON.stringify(filter_del));
            completed();

           
           
            var filter_3 = itens_completed_3.filter(e => e.status == 'actived')

            if (filter_3.length <= 0) {
                document.querySelector('.removeAll').classList.add('remove_hide')
            } else {
                document.querySelector('.removeAll').classList.remove('remove_hide')
            }
        })


    });

    }

}
completed()




//showData();



