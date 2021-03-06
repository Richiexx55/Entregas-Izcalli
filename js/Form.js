/* funcion para uso general que crea el titulo de las secciones */
tituloRest = (img, nombre,id) => {         
    restElegido = document.createElement("div");
    restElegido.setAttribute("id", id )
    restElegido.setAttribute("class", "container-fluid d-flex justify-content-center align-items-center");
    restElegido.innerHTML += 
      `<div>
          <img class="img-fluid" src=${img} alt=${nombre} width="60">
      </div>
      <h5 class="ml-3">
          ${nombre}
      </h5>`
    contenedorVacio1.setAttribute("class", "col-12 mb-3 border")
    contenedorVacio1.appendChild(restElegido);
  }


/*3.- FUNCION LISTA DE RESTAURANTES Y MENU*/
function cargarMenuRest(rest){

    nombreRest = rest.querySelector("h5").innerHTML;
    imgRest = rest.querySelector("img").src;
    idRest = "titulo_rest"

    contenedorVacio1 = document.getElementById("contenedor_rest_vacio"); 
    elementosContenedor = contenedorVacio1.children;
    
/* se usa el if para clocar un nuevo elemento como titulo si el valor del recorrido de los hijos del contenedor vacio es 0 o en caso contrario borrar al elemento creado que ocupo el titulo tras elegir Restaurante*/
    if(elementosContenedor.length == 0){
        tituloRest(imgRest, nombreRest, idRest);
    }else{    
        document.getElementById(idRest).remove();
        tituloRest(imgRest, nombreRest,idRest);
    }
/* Se cambia el valor de collapse-show a collapse en la calse del elemento para esconder los botones tras haber elegido zona deentrega*/
    document.getElementById("lista_restaurantes")
    .setAttribute("class", "collapse row mb-3"); 
/* Quita el valor d-none para mostara la seiguiente seccion de categorias */
    document.getElementById("lista_menu")
    .setAttribute("class", "row p-0 pb-3");


/* ---------------------------------------------------------- */
    fetch(`./js/restaurantes.json`)
    .then(respuesta => respuesta.json())
    .then (restaurantes => 
      restaurantes.forEach(restaurante => {
        
        if(restaurante.nombre == nombreRest){
            menuRest = restaurante.menu;
            
            for(i=0;i<menuRest.length;i++){
                menuCate = menuRest[i].categoriaMenu;
                ListaCate = menuRest[i].lista;

                let contMenuCateg = document.getElementById("lista_menu");
                /* let contListPlati = document.getElementById("categorias_menu_lista"); */
  
                     categoriaMenu = document.createElement("div");
                     categoriaMenu.setAttribute("data-toggle", "collapse");
                     categoriaMenu.setAttribute("data-target", `#categoria_menu_${i}`);
                     categoriaMenu.setAttribute("class", "card-header col-12 border d-flex justify-content-between align-items-center");
                     categoriaMenu.innerHTML +=
                     `<p class="d-flex align-items-center mb-0"><strong>${menuCate}</strong></p> 
                     <img src="./img/iconos/icono-down.png" alt="down" width="10" height="10">`
                     contMenuCateg.appendChild(categoriaMenu);

                     listaCategoria = document.createElement("div");
                     listaCategoria.setAttribute("id",`categoria_menu_${i}`)
                     listaCategoria.setAttribute("class", "collapse col-12 mt-1 pb-3")
                     contMenuCateg.appendChild(listaCategoria);

                     paltillosList = document.createElement("div");
                     paltillosList.setAttribute("class", "justify-content-center");
                     
                     ListaCate.forEach(platillo => {
                    
                        paltillosList.innerHTML +=  
                        `<div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-2">
                            <button class="btn container-fluid border rounded">
                                <div class="d-flex justify-content-between align-items-center">   
                                    <h5 class="d-flex mb-1 mt-2"><strong class="d-flex justify-content-start">${platillo.nombreArt}</strong></h5>
                                    <p class="d-flex align-items-start mb-0 mt-2 badge-pill badge-warning"><span class="font-weight-bold">$${platillo.precio}</span></p>
                                </div>
                                <p class="d-flex justify-content-start mt-0 font-italic">${platillo.descripcion}
                                </p>  
                            </button>
                         </div>`       
                     })

                     listaCategoria.appendChild(paltillosList);  
                            
            }
        }
      }
    )
  )
}

hola = document.getElementById("lista_menu");
hola2 = hola.children;

console.log(hola2.length);

