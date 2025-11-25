let transaccionesArray = [
  {detalle: "depósito", monto: 50000, descripcion: "Depósito a la cuenta"},
  {detalle: "transferencia realizada", monto: -15000, descripcion: "Transferencia a Raúl González"},
  {detalle: "transferencia recibida", monto: 32000, descripcion: "Transferencia de María López"},
  {detalle: "compra", monto: -4500, descripcion: "Compra en supermercado"},
  {detalle: "depósito", monto: 20000, descripcion: "Depósito a la cuenta"},
  {detalle: "transferencia realizada", monto: -7800, descripcion: "Transferencia a Juan Pérez"},
  {detalle: "transferencia recibida", monto: 54000, descripcion: "Transferencia de Ana Martínez"},
  {detalle: "compra", monto: -12000, descripcion: "Compra en falabella"},
  {detalle: "transferencia realizada", monto: -3000, descripcion: "Transferencia a Luis Ramírez"},
  {detalle: "depósito", monto: 100000, descripcion: "Depósito a la cuenta"}
];

$(document).ready(function () {
    let movimientosGuardados = JSON.parse(localStorage.getItem('transaccionesNuevas')) || [];
    let totalMovimientos = transaccionesArray.concat(movimientosGuardados);

    localStorage.setItem('transaccionesTotales', JSON.stringify(totalMovimientos));

    function mostrarUltimosMovimientos(filtro) {
        let historialTransacciones = JSON.parse(localStorage.getItem('transaccionesTotales')) || [];
        let listaTransacciones = $('#lista_transacciones');

        listaTransacciones.empty();

        let filtrados = filtro === 'todos' 
            ? historialTransacciones 
            : historialTransacciones.filter(t => t.detalle === filtro);

        
        filtrados.reverse().forEach(function(transaccion) {
            let detalleTransaccion = `<li class="border p-2 rounded mb-1">
                <span class="fs-5 text-roboto">$${transaccion.monto.toLocaleString()}</span> - 
                <span><span class="fw-bold text-roboto">${getTipoTransaccion(transaccion.detalle)}:</span> ${transaccion.descripcion}</span>
            </li>`;
            listaTransacciones.append(detalleTransaccion);
        });
    }

    function getTipoTransaccion(tipo) {
        switch(tipo) {
            case "depósito": return "DEPÓSITO";
            case "transferencia realizada": return "TRANSFERENCIA";
            case "transferencia recibida": return "TRANSFERENCIA";
            case "compra": return "COMPRA";
            default: return tipo;
        }
    }

    mostrarUltimosMovimientos('todos');

    $('#tipoFiltro').on('change', function() {
        let filtroSeleccionado = $(this).val();
        mostrarUltimosMovimientos(filtroSeleccionado);
    });
});
           
