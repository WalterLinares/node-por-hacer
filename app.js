const argv = require('./config/yargs.js').argv;
const { crear, listar, actualizar, borrar } = require('./por-hacer/por-hacer');

let main = async() => {
    try {
        let comando = argv._[0];

        switch (comando) {
            case "crear":
                let tarea = await crear(argv.descripcion);
                console.log(tarea);
                break;

            case "listar":
                let completado_ = null;
                if (argv.completado == null) {
                    completado_ = null;
                }
                if (argv.completado === "true") {
                    completado_ = true;
                } else if (argv.completado === "false") {
                    completado_ = false;
                }

                let listado = await listar(completado_);
                for (let tarea of listado) {
                    console.log(`==========Por Hacer =========`.green);
                    console.log(tarea.descripcion);
                    console.log(`Estado: ${tarea.completado}`);
                    console.log(`=============================`.green);
                }
                break;

            case "actualizar":
                await actualizar(argv.descripcion, argv.completado);
                break;

            case "borrar":
                await borrar(argv.descripcion);
                break;

            default:
                console.log("Comando no reconocido");
        };
    } catch (err) {
        console.log("Error:" + err);
        return -1;
    }

    return 0;
}

main().then(retcode => {
    console.log("Finished with retcode:" + retcode);
}).catch(err => {
    console.log("Main error:" + err);
});