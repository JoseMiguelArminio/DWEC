const {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
} = require('./empleados');

// Agregar empleados
agregarEmpleado({ id: 1, nombre: "Ana", departamento: "TI", salario: 3000 });
agregarEmpleado({ id: 2, nombre: "Luis", departamento: "RRHH", salario: 2500 });
agregarEmpleado({ id: 3, nombre: "Carla", departamento: "TI", salario: 3200 });
agregarEmpleado({ id: 4, nombre: "Pedro", departamento: "Ventas", salario: 2800 });

console.log("Empleados en TI:");
console.log(buscarPorDepartamento("TI"));

console.log("\nSalario promedio:");
console.log(calcularSalarioPromedio());

console.log("\nEmpleados ordenados por salario:");
console.log(obtenerEmpleadosOrdenadosPorSalario());
