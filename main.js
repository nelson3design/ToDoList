


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
          
           
           
            document.querySelector('.agregar_add').classList.remove('show_agregar')
            document.querySelector('.agregar_edit').classList.add('show_agregar_edit')
           
        } else if (el.target.classList.contains('actived')) {
            page_all.classList.add('page_hide')
            page_active.classList.remove('page_hide')
            page_completed.classList.add('page_hide')
            refreshActived()
            

            document.querySelector('.agregar_add').classList.add('show_agregar')
            document.querySelector('.agregar_edit').classList.add('show_agregar_edit')
            
        }else if (el.target.classList.contains('all')){
            page_all.classList.remove('page_hide')
            page_active.classList.add('page_hide')
            page_completed.classList.add('page_hide')
            all()
            
            document.querySelector('.agregar_add').classList.add('show_agregar')
            document.querySelector('.agregar_edit').classList.add('show_agregar_edit')
           
        }
        
        
    })
})



function uniqueId(){
    return Math.floor(Math.random() * Date.now())
}



var btn = document.querySelector('.btn_add')
var input = document.querySelector('.input_add')
var btn_edit = document.querySelector('.btn_edit')
var input_edit = document.querySelector('.input_edit')
btn.addEventListener('click',(e)=>{
    var list = JSON.parse(localStorage.getItem('list') || '[]')
    var value = input.value.trim()
    if (value != ""){

        var filter = list.find(e=> e.name == value)
      
        if (filter == undefined){
            var data = {
                "id": uniqueId(),
                "name": value,
                "status": "inactived"
            }

            list = [...list, data]
            list.sort(function (a, b) {
                var idA = parseInt(a.id);
                var idB = parseInt(b.id);

                return idA - idB;
            });
            localStorage.setItem('list', JSON.stringify(list))

            all()
            refreshActived()
            document.querySelector('.input_add').value = ""
        }else{
            alert(`${value} já existe, digite um outro nome.`)
            document.querySelector('.input_add').value = ""
        }
        

    }else{
        alert('Digite um nome')
    }
})


//edit

btn_edit.addEventListener('click', (e) => {
    var list = JSON.parse(localStorage.getItem('list') || '[]')
    var value = input_edit.value.trim()
    var itens_edit = JSON.parse(sessionStorage.getItem('edit'));
    if (value != "") {

        var filter = list.find(e => e.name == value)

        if (filter == undefined) {

            document.querySelector('.agregar_edit').classList.add('show_agregar_edit')
            document.querySelector('.agregar_add').classList.add('show_agregar')

            var objetoRemover = { id: itens_edit.id };

            list = list.filter(function (objeto) {
                return objeto.id !== objetoRemover.id;
            });



            var data = {
                "id": itens_edit.id,
                "name": value,
                "status": itens_edit.status
            }

            list = [...list, data]
            list.sort(function (a, b) {
                var idA = parseInt(a.id);
                var idB = parseInt(b.id);

                return idA - idB;
            });
            localStorage.setItem('list', JSON.stringify(list))

            all()
            refreshActived()
            document.querySelector('.input_edit').value = ""
        } else {
            alert(`${value} já existe, digite um outro nome.`)
            document.querySelector('.input_edit').value = ""
        }


    } else {
        alert('Digite um nome')
    }
})

var edit_cancel = document.querySelector('.fa-circle-xmark')
edit_cancel.addEventListener('click',()=>{
    document.querySelector('.agregar_edit').classList.add('show_agregar_edit')
    sessionStorage.removeItem('edit')
    document.querySelector('.input_edit').value = ""
    document.querySelector('.agregar_add').classList.add('show_agregar')
})




function all(){
    var all_items = document.getElementById('page_all')
    var itens_alls = JSON.parse(localStorage.getItem('list'));
    itens_alls.sort(function (a, b) {
        var idA = parseInt(a.id);
        var idB = parseInt(b.id);

        return idA - idB;
    });
    var template = '';
    itens_alls.forEach((e) => {
        template += `
      <li>
        <div class="list_btn">
           <input type="checkbox" id="${e.name}" ${e.status == 'actived' ? 'checked' : null}>
           <label for="${e.name}" data-name="${e.name}">${e.name}</label>
        </div>
        <div class="del_edit">
          
           <i class="fa-solid fa-pen-to-square edit" data-id="${e.id}"></i>
           <i class="fas fa-trash delete" data-id="${e.id}"></i>
        </div>
      </li>
    `;
    });
    all_items.innerHTML = template;


    var lists_actived = page_all.querySelectorAll('ul li .list_btn label');
   
    
    lists_actived.forEach((e) => {
        e.addEventListener('click', (el) => {
            var getName = el.target.getAttribute('data-name')
            var renameObject = itens_alls.find(function (object) {
                return object.name === getName;
            });

            var input = el.target.previousElementSibling

            if(input.checked == false){
                
                if (renameObject) {
                    renameObject.status = 'actived';
                    localStorage.setItem('list', JSON.stringify(itens_alls));
                    all();
                }
            }else{
                
                if (renameObject) {
                    renameObject.status = 'inactived';
                    localStorage.setItem('list', JSON.stringify(itens_alls));
                    all();
                }
            }

            

         
        });
    });

    var all_icon_edit = document.querySelectorAll('.all_icon ul li .edit')
    all_icon_edit.forEach((edit)=>{

        edit.addEventListener('click',(e)=>{
            var get_id_edit = Number(e.target.getAttribute('data-id'))
            var filter = itens_alls.find(i=> i.id == get_id_edit)
            input_edit.value=filter.name
            input_edit.focus()
            sessionStorage.setItem('edit', JSON.stringify(filter))
            document.querySelector('.agregar_edit').classList.remove('show_agregar_edit')
            document.querySelector('.agregar_add').classList.remove('show_agregar')
            all();
        })
    })

    var all_icon_delete = document.querySelectorAll('.all_icon ul li .delete')
    all_icon_delete.forEach((deleted) => {

        deleted.addEventListener('click', (e) => {
            var get_id_deleted = Number(e.target.getAttribute('data-id'))

            var objetoRemover = { id: get_id_deleted };

            itens_alls = itens_alls.filter(function (objeto) {
                return objeto.id !== objetoRemover.id;
            });
            localStorage.setItem('list', JSON.stringify(itens_alls));
            all();
           

        })
    })

    

}
all()

function refreshActived() {
    var all_items = document.getElementById('page_active');
    var itens_actived = JSON.parse(localStorage.getItem('list'));
    itens_actived.sort(function (a, b) {
        var idA = parseInt(a.id);
        var idB = parseInt(b.id);

        return idA - idB;
    });
    
    var filter = itens_actived.filter(e => e.status == 'inactived');

    if (filter !== undefined) {
        var template = '';

        filter.forEach((e) => {
            template += `
                <li>
                <div class="list_btn">
                <input type="checkbox" id="${e.name}" ${e.status == 'actived' ? 'checked' : null}>
                <label for="${e.name}" data-name="${e.name}">${e.name}</label>
                </div>
                <div class="del_edit">
                
                <i class="fa-solid fa-pen-to-square edit" data-id="${e.id}"></i>
                <i class="fas fa-trash delete" data-id="${e.id}"></i>
                </div>
            </li>
            `;
        });

        all_items.innerHTML = template;

        var lists_actived = page_active.querySelectorAll('ul li .list_btn label');

        lists_actived.forEach((e) => {
            e.addEventListener('click', (el) => {
                var getName = el.target.getAttribute('data-name');

                var renameObject = itens_actived.find(function (object) {
                    return object.name === getName;
                });

                var input = el.target.previousElementSibling;

                if (input.checked == false) {
                    if (renameObject) {
                        renameObject.status = 'actived';
                        localStorage.setItem('list', JSON.stringify(itens_actived));
                        refreshActived();
                    }
                } else {
                    if (renameObject) {
                        renameObject.status = 'inactived';
                        localStorage.setItem('list', JSON.stringify(itens_actived));
                        refreshActived();
                    }
                }
            });
        });

        
    }

    var actived_icon_edit = document.querySelectorAll('.all_icon ul li .edit');
    actived_icon_edit.forEach((edit) => {
        edit.addEventListener('click', (e) => {
            var get_id_edit = Number(e.target.getAttribute('data-id'));
            var filter = itens_actived.find(i => i.id == get_id_edit);
            input_edit.value = filter.name;
            input_edit.focus();
            sessionStorage.setItem('edit', JSON.stringify(filter));
            document.querySelector('.agregar_edit').classList.remove('show_agregar_edit');
            document.querySelector('.agregar_add').classList.remove('show_agregar');
            refreshActived();
        });
    });

    var actived_icon_delete = document.querySelectorAll('.all_icon ul li .delete');
    actived_icon_delete.forEach((actived) => {
        actived.addEventListener('click', (e) => {

            var get_id_actived = Number(e.target.getAttribute('data-id'));

            var objetoRemover = { id: get_id_actived };

            itens_actived = itens_actived.filter(function (objeto) {
                return objeto.id !== objetoRemover.id;
            });

            localStorage.setItem('list', JSON.stringify(itens_actived));
            refreshActived(); // aqui esta o error esta linha (actived is not a function)
        });
    });



    
}

refreshActived();





function completed() {
    var all_items = document.getElementById('page_completed')
    var itens_completed = JSON.parse(localStorage.getItem('list'));
    itens_completed.sort(function (a, b) {
        var idA = parseInt(a.id);
        var idB = parseInt(b.id);

        return idA - idB;
    });
    var filter = itens_completed.filter(e => e.status == 'actived')
    if(filter !== undefined){

   
    var template = '';
    filter.forEach((e) => {
        template += `
      <li ${e.status == 'actived' ? `class=${e.status}` : `class=${e.status}`}>
        <div class="list_btn">
          
           <label for="${e.name}">${e.name}</label>
        </div>
        <div class="del" data-id="${e.id}">
           <i class="fas fa-trash" data-id="${e.id}"></i>
        </div>
      </li>
    `;
    });
    all_items.innerHTML = template;

    var lists_del = page_completed.querySelectorAll('li .del');

    lists_del.forEach((e) => {
        e.addEventListener('click', (el) => {
            var getId = Number(el.target.getAttribute('data-id'))
            

            var objetoRemover = { id: getId };

            itens_completed = itens_completed.filter(function (objeto) {
                return objeto.id !== objetoRemover.id;
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







