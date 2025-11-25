//Redireccion a depositar dinero
document.getElementById('depositButton').addEventListener('click', function(event){
    event.preventDefault();
    
    document.querySelector('h2').style.display = 'none';
    document.querySelector('.saldo').style.display = 'none';
    document.querySelector('.menu').style.display = 'none';

    const spinner = document.createElement('div');
    const containerSpinner = document.createElement('div');
    const successMessage = document.createElement('h3');

    successMessage.className = 'text-center text-success text-roboto mt-5';
    successMessage.textContent = 'Redirigiendo a Depositar Dinero...';

    containerSpinner.className = 'd-flex justify-content-center';
    spinner.className = 'spinner-border mt-5';

    containerSpinner.appendChild(spinner);

    document.body.appendChild(containerSpinner);
    document.body.appendChild(successMessage);

    setTimeout(() => {
        window.location.assign("/deposit.html");
    }, 2000);
    
})

//Redireccion a transferir dinero
document.getElementById('sendMoneyButton').addEventListener('click', function(event){
    event.preventDefault();
    
    document.querySelector('h2').style.display = 'none';
    document.querySelector('.saldo').style.display = 'none';
    document.querySelector('.menu').style.display = 'none';

    const spinner = document.createElement('div');
    const containerSpinner = document.createElement('div');
    const successMessage = document.createElement('h3');

    successMessage.className = 'text-center text-success text-roboto mt-5';
    successMessage.textContent = 'Redirigiendo a Enviar Dinero...';

    containerSpinner.className = 'd-flex justify-content-center';
    spinner.className = 'spinner-border mt-5';

    containerSpinner.appendChild(spinner);

    document.body.appendChild(containerSpinner);
    document.body.appendChild(successMessage);

    setTimeout(() => {
        window.location.assign("/sendMoney.html");
    }, 2000);

})


// Redireccion a ultimos movimientos
document.getElementById('transactionsButton').addEventListener('click', function(event){
    event.preventDefault();
    
    document.querySelector('h2').style.display = 'none';
    document.querySelector('.saldo').style.display = 'none';
    document.querySelector('.menu').style.display = 'none';

    const spinner = document.createElement('div');
    const containerSpinner = document.createElement('div');
    const successMessage = document.createElement('h3');

    successMessage.className = 'text-center text-success text-roboto mt-5';
    successMessage.textContent = 'Redirigiendo a Últimos Movimientos...';

    containerSpinner.className = 'd-flex justify-content-center';
    spinner.className = 'spinner-border mt-5';

    containerSpinner.appendChild(spinner);

    document.body.appendChild(containerSpinner);
    document.body.appendChild(successMessage);

    setTimeout(() => {
        window.location.assign("/transactions.html");
    }, 2000);

})


// localStorage para el saldo actual

if (!localStorage.getItem("saldoTotal")){
    localStorage.setItem("saldoTotal", 30000000);
}

let saldo = Number(localStorage.getItem("saldoTotal"));

document.getElementById("saldoTotal").textContent = `$${saldo.toLocaleString()}`;
