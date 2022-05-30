const ingresos = [new Ingreso("Venta vehiculo", 3000.0),
new Ingreso('Casa',1000)];
const egresos = [new Egreso("Fallo del pc", 500.0),new Egreso("Compra Vehiculo", 1500.0)];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};
let totalEgreso = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgreso();
  let porcentajeEgreso = totalEgreso() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje_egresos").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgreso());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};
const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("es-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso=>ingreso.id===id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
}
const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso=>egreso.id===id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}

const cargarIngresos=()=>{
    let ingresosHTMl = ''
    for(let ingreso of ingresos){
        ingresosHTMl += crearIngresoHTML (ingreso);
    }
    document.getElementById('lista_ingresos').innerHTML = ingresosHTMl;
}
const cargarEgresos=()=>{
    let egresosHTMl = ''
    for(let egreso of egresos){
        egresosHTMl += crearEgresoHTML (egreso);
    }
    document.getElementById('lista_egresos').innerHTML = egresosHTMl;
}
const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
              </div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick = "eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
              </div>
            </div>
          </div>
    `;
    return ingresoHTML;
}
const crearEgresoHTML =(egreso)=>{
    let egresoHTML= `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgreso())}</div>
      <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
              </div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick = "eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
              </div>
    </div>
  </div>
    `
    return egresoHTML;
}

let agregarDato = () =>{
  let forma = document.forms['forma'];
  let tipo = forma['tipo'];
  let descripcion = forma['descripcion'];
  let valor = forma['valor'];
  if(descripcion.value !== '' && valor.value !== ''){
    if(tipo.value === 'ingreso'){
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
    }
    else if(tipo.value === 'egreso'){
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }else{
      alert('algo salio mal')
    }
  }
}

