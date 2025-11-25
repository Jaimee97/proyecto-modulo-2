const tbody = document.querySelector('tbody'); 

const movimientos = localStorage.getItem('movimientos');

if (movimientos) {      
    const movimientosArray = movimientos.split('|');

    movimientosArray.forEach(x => {
        const transaccion = x.split(",");

        const fila = document.createElement('tr');  
        fila.innerHTML = `
            <th scope="row">${transaccion[0]}</th>
            <td>${transaccion[1]}</td>
        `;      
        tbody.appendChild(fila);
    });
}   
