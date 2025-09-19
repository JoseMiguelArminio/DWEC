function gestionarRetiro(saldo, retirar, tieneTarjetaCredito) {
    if (saldo >= retirar) {
        const nuevoSaldo = saldo - retirar
        console.log(`Retiro exitoso. Saldo restante: ${nuevoSaldo}`)
    } else if (tieneTarjetaCredito) {
        console.log('Saldo insuficiente, pagando con tarjeta de crédito')
    } else {
        console.log('Saldo insuficiente')
    }
}

gestionarRetiro(1000, 500, false) // Retiro exitoso. Saldo restante: 500
gestionarRetiro(1000, 1500, true) // Saldo insuficiente, pagando con tarjeta de crédito
gestionarRetiro(1000, 1500, false) // Saldo insuficiente
gestionarRetiro(500, 600, true) // Saldo insuficiente, pagando con tarjeta de crédito
