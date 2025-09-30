let empleados = [];

function agregarEmpleado(empleado) {
  empleados.push(empleado);
}

function eliminarEmpleado(id) {
  const index = empleados.findIndex(emp => emp.id === id);
  if (index !== -1) {
    empleados.splice(index, 1);
  }
}

function buscarPorDepartamento(departamento) {
  return empleados.filter(emp => emp.departamento === departamento);
}

function calcularSalarioPromedio() {
  if (empleados.length === 0) return 0;
  const total = empleados.reduce((sum, emp) => sum + emp.salario, 0);
  return total / empleados.length;
}

function obtenerEmpleadosOrdenadosPorSalario() {
  return [...empleados].sort((a, b) => b.salario - a.salario);
}

module.exports = {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
};
