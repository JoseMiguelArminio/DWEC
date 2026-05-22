const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("Falta la variable de entorno MONGODB_URI");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB conectado correctamente");

    } catch (error) {
        console.error("Error al conectar con MongoDB:");
        console.error(error.message);

        process.exit(1);
    }
};

module.exports = conectarDB;