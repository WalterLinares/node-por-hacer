const descripcion = {
    demand: true,
    alias: "d"
};

const completado = {
    alias: "c",
    default: true
};

const completadoOp = {
    alias: "c"
}


const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', { descripcion })
    .command('listar', 'Lista los elementos por hacer', { completado: completadoOp })
    .command('actualizar', 'Actualiza un elemento por hacer', { descripcion, completado })
    .command('borrar', 'Borra un elemento por hacer', { descripcion })
    .help()
    .argv;

module.exports = {
    argv: argv
};