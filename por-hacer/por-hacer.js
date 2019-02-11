const fs = require('fs');
const colors = require('colors');

let listado = [];

const guardarDB = async() => {
    let filepath = "./db/data.json";
    let data = JSON.stringify(listado);

    fs.writeFileSync(filepath, data);

    return true;
};

const cargarDB = async() => {
    try {
        listado = require("../db/data.json");
    } catch (err) {
        listado = [];
    }
};

const crear = async(descripcion) => {
    let porHacer = {
        descripcion: descripcion,
        completado: false
    };

    await cargarDB();
    listado.push(porHacer);
    await guardarDB();

    return porHacer;
};

const listar = async(completado) => {
    await cargarDB();
    let listado_ = [];
    if (completado != null) {
        listado_ = listado.filter(tarea => {
            return tarea.completado === completado;
        });
    } else {
        listado_ = listado;
    }
    return listado_;
};

const actualizar = async(descripcion, completado = true) => {
    await cargarDB();
    let index = listado.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listado[index].completado = completado;
        await guardarDB();
    } else {
        throw new Error("No existe tarea: " + descripcion);
    }
};

const borrar = async(descripcion) => {
    await cargarDB();
    let nuevolistado = listado.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });


    if (nuevolistado.length != listado.length) {
        listado = nuevolistado;
        await guardarDB();
    }
};

module.exports = {
    crear: crear,
    listar: listar,
    actualizar: actualizar,
    borrar: borrar
};