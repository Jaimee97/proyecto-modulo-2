document.getElementById('loginButton').addEventListener('click', function(event){
    
    event.preventDefault();

    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value.trim();

    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{1,10}$/;

    /* Hice validaciones con expresiones regulares, le pedí a chatgpt
    que creara una validacion para email y para la contraseña le dije
    que debe tener al menos:
    - al menos 1 mayuscula
    - letras
    - numeros
    - minimo 1 y maximo 10 caracteres */

    if(!emailPattern.test(email)){
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    if(!passwordPattern.test(password)){
        alert('La contraseña debe tener entre 1 y 10 caracteres, incluir al menos una letra mayúscula y un número.');
        return;
    }

    document.querySelector('form').style.display = 'none';
    document.querySelector('p').style.display = 'none';
    document.querySelector('h2').style.display = 'none';

    const spinner = document.createElement('div');
    const containerSpinner = document.createElement('div');
    const successMessage = document.createElement('h3');

    successMessage.className = 'text-center text-success text-roboto mt-5';
    successMessage.textContent = '¡Inicio de sesión exitoso!';

    containerSpinner.className = 'd-flex justify-content-center';
    spinner.className = 'spinner-border mt-5';

    containerSpinner.appendChild(spinner);

    document.body.appendChild(containerSpinner);
    document.body.appendChild(successMessage);

    setTimeout(() => {
        window.location.assign("/menu.html");
    }, 2000);


})