const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

// Bandera para controlar si se ha ingresado un operador
// Variable para almacenar el último operador ingresado
let operadorIngresado = false; 
let ultimoOperador = null; 

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "btn-c") {
            pantalla.textContent = "0";
            // Reiniciar la bandera
            operadorIngresado = false; 
            // Prueba true
            //operadorIngresado = true; 
            ultimoOperador = null; 
            return;
        }
        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error Carechimba!") {
                pantalla.textContent = "0";
                operadorIngresado = false; // Reiniciar la bandera
                ultimoOperador = null; // Reiniciar la variable
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
                //Si el último carácter borrado era un operador
                if (["+","-","*","/"].includes(pantalla.textContent.slice(-1))) {
                    operadorIngresado = false;
                    ultimoOperador = null; // Reiniciar la variable
                }
            }
            return;
        }
        if (boton.id === "igual") {
            try {
                pantalla.textContent = eval(pantalla.textContent);
            } catch {
                pantalla.textContent = "Error Carechimba!";
            }
            operadorIngresado = false; 
            ultimoOperador = null; 
            return;
        }

        // Verificar si el botón apretado es un operador y si ya se ingresó un operador previamente
        if (["+","-","*","/"].includes(botonApretado) && operadorIngresado) {
            pantalla.textContent = pantalla.textContent.slice(0, -1) + botonApretado; // Reemplazar el operador anterior
            ultimoOperador = botonApretado; // Actualizar el último operador
            return;
        }

        // Si no es un operador o si es el primer operador, agregar el valor a la pantalla
        if (pantalla.textContent === "0" && !["+","-","*","/"].includes(botonApretado)) {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
        // Si el botón apretado es un operador, establecer la bandera a verdadero y actualizar el último operador
        if (["+","-","*","/"].includes(botonApretado)) {
            operadorIngresado = true;
            ultimoOperador = botonApretado;
        } else {
            operadorIngresado = false; // Reiniciar la bandera si no es un operador
        }
    });
});
