/* Para el trabajo anterior hice las validaciones con expresiones regulares, 
pero, creo que malinterprete las instrucciones y me fui por otro lado, así que,
ahora lo hare simplemente validando una cuenta existente con email y password*/

let adminEmail = "admin@gmail.com";
let adminPassword = "admin123";

$("document").ready(function(){
    $("#loginForm").submit(function(event){
        event.preventDefault();         
        const email = $("#userEmail").val().trim();
        const password = $("#userPassword").val().trim();
        if(email !== adminEmail){
            $("#userEmail").after(`
                <div class="alert alert-warning text-roboto alert-dismissible fade show" role="alert">
                    <strong>Usuario incorrecto!</strong> Por favor, vuelve a ingresar tu correo electrónico.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `);
            return;
        }   
        if(password !== adminPassword){
            $("#userPassword").after(`
                <div class="alert alert-warning text-roboto alert-dismissible fade show" role="alert">
                    <strong>Contraseña incorrecta!</strong> Por favor, vuelve a ingresar tu contraseña.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `);
            return;
        }

        $("form").hide();
        $("p").hide();
        $("h2").hide();

        const spinner = $('<div>');
        spinner.addClass('spinner-border mt-5');

        const containerSpinner = $('<div>');
        containerSpinner.addClass('d-flex justify-content-center');
        containerSpinner.append(spinner);

        const successMessage = $('<h3>')
        successMessage.addClass('text-center text-success text-roboto mt-5')
        successMessage.text('¡Inicio de sesión exitoso!');

        $('body').append(containerSpinner);
        $('body').append(successMessage);
        setTimeout(() => {
            window.location.href = "./menu.html";
        }, 2000);
    });
});




