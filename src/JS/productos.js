const apiKey = "$2a$10$eOsaPW2ljAl3E823gVdkwepHIBVMslBpa4rQE.OVT4R/ZoXUesnKC";
fetch(`https://api.jsonbin.io/v3/b/6877ff51c7f29633ab29e6a0`, {
//fetch(`src/JSON/productos.json`, {
    headers: { "X-Access-Key": apiKey }
  })
    .then(response => response.json())
    .then(data => {
       // renderConfiguracion(data);
        renderProductos(data.record);
       // renderProductos(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

function renderConfiguracion(info) {
    config = info.configuracion
    const producto = document.getElementById('producto');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    producto.style.backgroundPosition = config.posicionimagen
    producto.style.backgroundImage = `url(${config.ubicacioncarpeta+config.imagenprincipal})`;
    
    h1.textContent = config.titulo;
    p.textContent = config.texto;

    producto.appendChild(h1);
    producto.appendChild(p);
}
limite = 20
function renderProductos(info) {
    ubicacioncarpeta = "src/PRODUCTOS/";
    productos = info.imagenes;
    const listaProductos = document.querySelector('.listaproductos');
    let indice = 0;
    
    productos.forEach(producto => {
        indice++;
        const item = document.createElement('div');
        const imagen = document.createElement('div');
        const h3 = document.createElement('h1');
        const p = document.createElement('p');
        imagen.classList.add("imagenp3");
        
        if (indice > limite) {
            item.style.display = "none";
            item.classList.add("oculto");
        }
        
        p.classList.add('texto');
        h3.textContent = producto.titulo;
        p.textContent = "$"+producto.precio;
        item.classList.add('producto');
        item.id = "item_"+producto.titulo;
        h3.classList.add('minititulo');
        item.setAttribute("data-marca", producto.marca);
        if(producto.marca2 != undefined && producto.marca2 != ""){
            item.setAttribute("data-marca2", producto.marca2);
        }else{
            item.setAttribute("data-marca2", producto.marca);
        }
        sino1 = false
        sino2= false
        sino3= false
      
        if(producto.adicionales != undefined && producto.solouno != undefined && producto.adicionales != undefined && producto.adicionales.length > 0){
            sino2= true
            text= `<select class="botonegro3" id="p2_${producto.titulo}">`;
            cont = 0
            producto.adicionales.forEach(opcion => { 
                if(cont == 0){
                    text+= `<option value="">ADICIONALES</option>`;
                }
                cont++
                text += `<option value="${opcion},${producto.precioadicionales}">${opcion} +$${producto.precioadicionales}</option>`;
            })
            text += `</select>`;
            item.innerHTML += text;
           

        }else if(producto.adicionales != undefined && producto.adicionales.length > 0){
            sino3= true
            text= `<details class="botonegro3"><summary>ADICIONALES</summary><div class=" checkboxes" id="p2_${producto.titulo}">`;
         
            producto.adicionales.forEach(opcion => { 
          
                
                text += ` <label><input type="checkbox" name="${producto.titulo}" value="${opcion},${producto.precioadicionales}">${opcion} +$${producto.precioadicionales}</label> `;
            })
            text += `</div></details>`;
            item.innerHTML += text;
           

        }
        if(producto.opciones != undefined && producto.opciones.length > 0){
            sino1= true

            text= `<select class="botonegro2" id="p_${producto.titulo}">`;
            cont = 0
            producto.opciones.forEach(opcion => { 
                if(cont == 0){
                    text+= `<option value="${opcion}">VER OPCIONES</option>`;
                }
                cont++
                text += `<option value="${opcion}">${opcion}</option>`;
            })
            text += `</select>`;
            item.innerHTML += text;
             }
        item.innerHTML += `<button class="botonegro" style="background-color: rgb(74, 178, 226);" onclick="carrito('${producto.titulo}','${producto.precio}','${ubicacioncarpeta + (producto?.imagen || "sinfoto.svg")}',${sino1},${sino2},${sino3})">AGREGAR AL CARRITO</button>`;

        
        if(producto.tamaño != undefined){
        imagen.style.backgroundSize =producto.tamaño;
            
        }else{
            imagen.style.backgroundSize = "80%";
        }
        imagen.style.backgroundImage = `url(${ubicacioncarpeta + (producto?.imagen || "sinfoto.svg")})`;
        imagen.style.backgroundPosition = producto?.posicionimagen || "center";
        if(producto.marca == "VIANDAS FITNESS" || producto.marca2 == "VIANDAS FITNESS"){
            imagen.innerHTML += `<h1 id="etiqueta">VIANDA FIT</h1>`;
            imagen.style.border = "solid #40c06f 0.5vh"
        }
        item.appendChild(imagen);
        item.appendChild(h3);
        item.appendChild(p);
        listaProductos.appendChild(item);
    });

   actualizarVisibilidadProductos()
    const botonVerMas = document.getElementById('vermas');
    botonVerMas.addEventListener("click", function () {
        let ocultos = document.querySelectorAll(".listaproductos .producto.oculto");
        ocultos.forEach((producto, index) => {
            if (index < 4 && producto.style.display === "none") {
                if (producto.classList.contains("oculto") && producto.style.display === "none") {
                    let titulo = producto.querySelector(".minititulo").textContent.toLowerCase();
                    let marca = producto.getAttribute("data-marca").toLowerCase();
                    let marca2 = producto.getAttribute("data-marca2").toLowerCase();
                    let filtro = document.getElementById("buscar").value.toLowerCase();
                    let marcaSeleccionada = document.getElementById("marcasbuscar").value.toLowerCase();

                    if ((titulo.includes(filtro) || marca.includes(filtro) || marca2.includes(filtro) ) && (marcaSeleccionada === "" || marca === marcaSeleccionada || marca2 === marcaSeleccionada)) {
                        producto.style.display = "grid";
                        producto.classList.remove("oculto");
                    }
                }
            }
        });

        actualizarBotonVerMas();
    });
}
function buscarcategoria(valor){
    document.getElementById("marcasbuscar").value = valor
    actualizarVisibilidadProductos()
    redirigir('menu2')
}
function actualizarVisibilidadProductos() {
    let filtro = document.getElementById("buscar").value.toLowerCase();
    let marcaSeleccionada = document.getElementById("marcasbuscar").value.toLowerCase();
    let productos = document.querySelectorAll(".listaproductos .producto");
    let sinResultados = document.getElementById("sinResultados");
    let hayResultados = false;
    let a = 0;
    productos.forEach(producto => {
        let titulo = producto.querySelector(".minititulo").textContent.toLowerCase();
        let marca = producto.getAttribute("data-marca").toLowerCase();
        let marca2 = producto.getAttribute("data-marca2").toLowerCase();
        if ((titulo.includes(filtro) || marca.includes(filtro) || marca2.includes(filtro)) && (marcaSeleccionada === "" || marca === marcaSeleccionada || marca2 === marcaSeleccionada) ) {
            a++
            if(a <= limite){
                producto.style.display = "grid";
                producto.classList.remove("oculto");
            }else{
                producto.style.display = "none";
            producto.classList.add("oculto");
            }
            hayResultados = true;
        } else {
            producto.style.display = "none";
            producto.classList.add("oculto");
        }
    });

    if (sinResultados) {
        sinResultados.style.display = hayResultados ? "none" : "grid";
    }

    actualizarBotonVerMas();
}
function eliminarfiltros(){
    document.getElementById("buscar").value = "";
    document.getElementById("marcasbuscar").value = "";
    actualizarVisibilidadProductos()
}
function actualizarBotonVerMas() {
    const botonVerMas = document.getElementById('vermas');
    const productosOcultos = document.querySelectorAll(".listaproductos .producto.oculto");
    const productosVisibles = document.querySelectorAll(".listaproductos .producto[style*='display: grid']");
    
    if (productosOcultos.length === 0 || productosVisibles.length === 0 || productosVisibles.length < limite) {
        botonVerMas.style.display = "none";
    } else {
        botonVerMas.style.display = "block";
    }
}

document.getElementById("botbuscar").addEventListener("click", actualizarVisibilidadProductos);
document.getElementById("volver").addEventListener("click", eliminarfiltros);
document.getElementById("marcasbuscar").addEventListener("input", function() {
    if (this.value === "") {
        actualizarVisibilidadProductos();
    }
});
document.getElementById("buscar").addEventListener("input", function() {
    if (this.value === "") {
        actualizarVisibilidadProductos();
    }
});
document.getElementById("buscar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        actualizarVisibilidadProductos();
    }
});