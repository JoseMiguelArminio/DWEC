const mongoose = require("mongoose");

const LibroSchema = new mongoose.Schema({
    referencia: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    genero: {
        type: String,
        trim: true
    },
    anyoPublicacion: {
        type: Number,
        min: 0
    },
    autor: {
        type: String,
        required: true,
        trim: true
    },
    imagenUrl: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Libro", LibroSchema);