$(document).ready(function() {

    let saldoActual = Number(localStorage.getItem("saldoTotal"));
    $("#saldo_actual").text(`Saldo actual: $${saldoActual.toLocaleString()}`);

    document.getElementById("depositBtn").addEventListener("click", function(event) {
    event.preventDefault();

    let saldoActual = Number(localStorage.getItem("saldoTotal"));
    let monto = Number(document.getElementById("deposit_input").value);

    if (monto <= 0 || isNaN(monto)) {
        $("#alert-container").append(`
                <div class="alert alert-warning mt-3 text-roboto alert-dismissible fade show" role="alert">
                    <strong>Monto inválido!</strong> Por favor, vuelve a ingresar la cantidad.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`);
        return;
    }

    $("#alert-container").append(`
                <div class="alert alert-warning mt-3 text-roboto alert-dismissible fade show" role="alert">
                    <strong>Depósito exitoso!</strong> Operación realizada correctamente.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`);

//  let saldoActual = Number(localStorage.getItem("saldoTotal"));

    let nuevoSaldo = saldoActual + monto;

    localStorage.setItem("saldoTotal", nuevoSaldo);

    $("#saldo_actual").text(`Saldo actual: $${nuevoSaldo.toLocaleString()}`);

//Guardar movimiento en el historial de depósitos  
    let transacciones = JSON.parse(localStorage.getItem("transaccionesNuevas")) || [];
    transacciones.push({ detalle: "depósito", monto: Number(monto), descripcion: "Depósito a la cuenta" });
    localStorage.setItem("transaccionesNuevas", JSON.stringify(transacciones));
    
    $("#lista_depositos").append(`<li>Depósito a la cuenta: ${monto.toLocaleString()}</li>`);
      
    setTimeout(() => {
            window.location.href = "menu.html";
    }, 2000);
});


}); 



