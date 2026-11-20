(async () => {
    try {
        const text = await navigator.clipboard.readText();
        if ( text.replace(/[^0-9]/g, '').length > 0 ) {
            const notas = text.split("\n").map(line => { 
                line = line.trim();
                line = line.replace(/,/g, '.'); // Reemplazar comas por puntos
                line = line.replace(/[^0-9\.\/]/g, ''); // Eliminar no numéricos (salvo barra)
                // si fracción
                partes = line.split('/');
                for ( var i = 0; i < partes.length; i++) {
                    partes[i] = parseFloat(partes[i]);
                }
                var numero = '';
                // si hay numerador y denominador que son números
                if ( partes.length > 1 && !isNaN(partes[0] && !isNaN(partes[1]) ) ) {
                    numero = partes[0] * 10 / partes[1];
                } 
                else {
                    numero = partes[0];
                }
                line = isNaN(numero) ? "" : numero.toFixed(2); // Formatear a dos decimales
                if ( !isNaN(numero) && numero < 1 ) {
                    line = "1";
                }
                if ( !isNaN(numero) && numero >= 10 ) {
                    line = "10";
                }
                return line;
            });
            if ( confirm("En el portapapeles encuentro los siguientes datos numéricos. ¿Quieres cargarlos como notas?\n" +
                notas.join("\n")
            ) ) {
                //const notas = text.split("\n").map(line => line.trim()).filter(line => line !== "");
                let linea = 1;
                let notasErroneas = [];
                for ( const nota of notas ) {
                    if ( nota !== "" ) {
                        const numero = parseFloat(nota);
                        if ( numero < 1 || numero > 10 ) {
                            notasErroneas.push([linea,nota]);
                        }
                    }
                    let criterio = 1;
                    let input = document.getElementById('CRITERIO_' + criterio + '_' + linea);
                    while ( input !== null ) {
                        input.value = nota + "";
                        criterio++;
                        input = document.getElementById('CRITERIO_' + criterio + '_' + linea);
                    }
                    linea++;
                } 
                if ( notasErroneas.length > 0 ) {
                    alert("Las siguientes notas no son válidas; revísalas, por favor:\n" +
                        notasErroneas.map(e => `Línea ${e[0]}: ${e[1]}`).join("\n")
                    );
                }

            }
        }
    } catch (err) {
        console.error("Error al leer el portapapeles:", err);
    }

})();
