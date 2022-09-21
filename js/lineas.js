//LINEAS DE PRODUCCION
//array LINEAS
let lineas = []
//Tablas LINEAS
const lineaCarpeta = document.getElementById("linea")



//Listeners
const btnlns = document.getElementById("verLineas")
btnlns.addEventListener('click', verLineas)
const botoneslns = document.getElementById("btnsLineas")
const btnLinea = document.getElementById("btnLinea")
btnLinea.addEventListener('click', verLinea)
const btnLNots = document.getElementById('btnLNots')
btnLNots.addEventListener('click', () => {
    document.getElementById('lnOTS').style.display = "flex"
    document.getElementById('lnOpes').style.display = "none"
})
const btnLNopes = document.getElementById('btnLNopes')
btnLNopes.addEventListener('click', () => {
    document.getElementById('lnOTS').style.display = "none"
    document.getElementById('lnOpes').style.display = "block"
})


//Ocultar formularios al iniciar
const lns = document.getElementById("Lineas")
lns.style.display = "none"
document.getElementById('lnOpes').style.display = "none"

//Funciones
function crearIDlinea() {
    let id = `LN${lineas.length}`
    return id
}
function verLineas() {
    lns.style.display == "none" ? lns.style.display = "block" : lns.style.display = "none"
    cargarBtnsLineas(lineas)
}
function cargarBtnsLineas(arrLns) {//carga botones con los nombres de las lineas
    botoneslns.innerHTML = ``
    arrLns.forEach(linea => {
        botoneslns.innerHTML += `<button class="btnLinea" id="${linea.idlinea}" title="🔍 ver linea: ${linea.idlinea} - ${linea.nombre} | ${linea.descripcion}">${linea.nombre}</button>`
    })
    //botoneslns.innerHTML += `<button id="btnNvaLn" title="➕🏭Crear Nueva Linea de producción.">➕🏭</button>`
    let btnslns = document.querySelectorAll('.btnLinea')
    btnslns.forEach(btn => {
        btn.addEventListener('click', () => {
            cargarLinea(btn.id)
        })
    })
}
function cargarLinea(IDlinea) {//carga informacion de la linea
    const ln = lineas.find(ln => ln.idlinea === IDlinea)
    const btnLinea = document.getElementById("btnLinea")
    btnLinea.innerHTML = `<h3>🏭 ${ln.nombre}</h3><b>${ln.descripcion}</b>`
    btnLinea.title = `${ln.idlinea}`
    btnLinea.disabled = false
    lineaCarpeta.style.display = "block"
    cardOTactiva(ln)
    tabOTSactivas(ln)
    tabOToperarios(ln)
}
function verLinea() {//muestra-oculta la carpeta de la linea seleccionada
    if (btnLinea.disabled === true) {
        lineaCarpeta.style.display = "none"
    } else {
        lineaCarpeta.style.display === "none" ? lineaCarpeta.style.display = "block" : lineaCarpeta.style.display = "none"
    }
}
function cardOTactiva(ln) {//carga la card de orden activa de la Linea seleccionada
    if (ln.ordenes.length === 0) {
        document.getElementById("lnOTid").innerHTML = `📑 Sin ordenes`
        document.getElementById("lnOTprod").innerHTML = `Sin Ordenes`
        document.getElementById("lnOTpresen").innerHTML = `Esperando ... `
        document.getElementById("lnOTico").innerHTML = `${EmojiEstado("DESHABILITADO")}`
        document.getElementById("lnOTestado").innerHTML = `DESHABILITADO`
        document.getElementById("lnOTunds").innerHTML = `<small><b>+info</b> para asignar 🔻</small><progress class="progress" value="0"></progress>`
    } else {
        const ot = ordenes.find(ot => ot.idorden === ln.ordenactiva)
        const prod = productos.find(prd => prd.idpr === ot.idproducto)
        document.getElementById("lnOTid").innerHTML = `${ot.idorden}`
        document.getElementById("lnOTprod").innerHTML = `${prod.nombre}`
        document.getElementById("lnOTpresen").innerHTML = `${prod.presentacion} - ${prod.descripcion}`
        document.getElementById("lnOTico").innerHTML = `${EmojiEstado(ot.estado)}`
        document.getElementById("lnOTestado").innerHTML = `${ot.estado}`
        document.getElementById("lnOTunds").innerHTML = `${ot.unidadesproducidas}/${ot.unidadespedidas} | ${parseInt((ot.unidadesproducidas / ot.unidadespedidas) * 100)}% <progress class="progress" value="${parseInt((ot.unidadesproducidas / ot.unidadespedidas * 100))}" max="100"></progress><button>🌀 <b>Actualizar</b></button>`
    }
}
function tabOTSactivas(ln) {//carga la tabla con ordenes en espera de la linea seleccionada
    if (ln.ordenes.length <= 1) {
        document.getElementById("OTStab").innerHTML = `<h3>📑Sin Ordenes en Espera</h3><br> <button onclick="asignsl()" title="Asignar Ordenes">📄 Asignar Ordenes</button>
                    `
    } else {
        document.getElementById("OTStab").innerHTML = `
            <h3>📑 Ordenes en Espera</h3>
            <table class="table">
              <thead><th>⚙️</th><th>🔜</th><th>ID</th><th>Producto</th><th>Unidades</th></thead>
              <tbody id="tableOTS"></tbody>
            </table>`
        ln.ordenes.forEach(idot => {
            const index = ln.ordenes.findIndex(idorden => idorden === idot)
            const otespera = ordenes.find(ot => ot.idorden === idot)
            const prodespera = productos.find(prd => prd.idpr === otespera.idproducto)
            let btnSubirOT = ``
            let btnBajarOT = ``
            index === 1 ? btnSubirOT = `<button id="" class="btnSubirOT" disabled>🔺</button>` : btnSubirOT = `<button id="${idot}" class="btnSubirOT">🔺</button>`;
            index === ln.ordenes.length - 1 ? btnBajarOT = `<button id="" class="btnBajarOT" disabled>🔻</button>` : btnBajarOT = `<button id="${idot}" class="btnBajarOT" >🔻</button>`;
            if (otespera.estado === "ESPERA") {
                document.getElementById("tableOTS").innerHTML += `
                    <tr>
                    <td>${btnSubirOT} ${btnBajarOT} <button class="btnQuitarOT" id="${otespera.idorden}">🗳️</button></td>
                    <td><b>${index}</b></td>
                    <td>${otespera.idorden}</td>
                    <td><b>${prodespera.nombre}</b> - ${prodespera.presentacion}</td>
                    <td>${otespera.unidadespedidas}</td>
                    </tr>
                    `
            }
        })
        const btnsQuitarOT = document.querySelectorAll('.btnQuitarOT')
        btnsQuitarOT.forEach(btn => {
            btn.addEventListener('click', () => {
                quitarOT(btn.id)
            })
        })
    }
}
function asignsl() {
    verLinea()
    masinfoasign()
}
function tabOToperarios(ln) {//muestra los operarios que hay en la sala
    document.getElementById('tabLnOperarios').innerHTML = ``
    ln.operarios.forEach(idope => {
        let ope = operarios.find(ope => ope.idope === idope)
        document.getElementById('tabLnOperarios').innerHTML += `<tr>
                                    <td><button id="${ope.idope}" title="Quitar a ${ope.nombre} de linea ${ln.nombre}">🗳️</button></td>
                                    <td>${ope.idope}</td>
                                    <td><b>${ope.nombre}</b></td>
                                    <td>${ope.categoria}</td>
                                </tr>`
    })



}
function quitarOT(idot) {
    const ot = ordenes.find(ot => ot.idorden === idot)
    const ln = lineas.find(ln => ln.idlinea === ot.linea)
    const index = ln.ordenes.findIndex(ln => ln === ot.idorden)
    Swal.fire({
        showCancelButton: true,
        title: `¡CUIDADO!`,
        text: `¿Desea quitar la Orden ${ot.idorden} de la linea ${ln.nombre}?`,
        icon: 'warning',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            ot.linea = null
            ot.estado = "NO ASIGNADO"
            ln.ordenes.splice(index, 1)

            cargarLinea(ln.idlinea)
            LineasLSset()
            OrdenesLSset()
            Swal.fire({
                title: `Orden ${ot.idorden} quitada correctamente!!!`,
                icon: 'success',
                timer: 2500,
                showConfirmButton: false,
            })
        }
    })
}


//Carga de datos
function LineasLSget() {//Busca LINEAS DE PROD en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const lnsJson = (JSON.parse(localStorage.getItem('KXlineas')) || null)
    if (lnsJson) {
        lnsJson.forEach(linea => {
            lineas.push(linea)
        })
        LineasLSset()
        cargarBtnsLineas()
    } else {
        fetchLineas()

    }
}
function LineasLSset() {//Guarda LINEAS DE PROD en localStorage
    const lnsJson = JSON.stringify(lineas)
    localStorage.setItem('KXlineas', lnsJson)
}
function fetchLineas() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.lineas.forEach(linea => {
                lineas.push(linea)
            });
            LineasLSset()
            cargarBtnsLineas()
        })
}
//clase
class linea {
    constructor(id, nombre, descripcion) {
        this.idlinea = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.operarios = []
        this.ordenes = []
        this.ordenactiva = (this.ordenes[0] || "Sin ordenes asignadas")
        this.logs = []
    }
}

//inicio
LineasLSget()