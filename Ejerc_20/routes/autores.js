const express = require("express");
const router = express.Router();
const Autor = require("../models/Autor");
const Libro = require("../models/Libro");

router.get("/", async (req, res) => {
    try {
        const filtro = {};

        if (req.query.nacionalidad) {
            filtro.nacionalidad = req.query.nacionalidad;
        }

        const autores = await Autor.find(filtro);
        res.json(autores);

    } catch (error) {
        res.status(500).json({ msg: "Error al obtener autores" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);

        if (!autor) {
            return res.status(404).json({ msg: "Autor no encontrado" });
        }

        res.json(autor);

    } catch (error) {
        res.status(500).json({ msg: "Error al buscar autor" });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevo = new Autor(req.body);
        await nuevo.save();

        res.status(201).json(nuevo);

    } catch (error) {
        res.status(500).json({ msg: "Error al crear autor" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const actualizado = await Autor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!actualizado) {
            return res.status(404).json({ msg: "Autor no encontrado" });
        }

        res.json(actualizado);

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar autor" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const eliminado = await Autor.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return res.status(404).json({ msg: "Autor no encontrado" });
        }

        res.json({ msg: "Autor eliminado" });

    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar autor" });
    }
});

router.get("/:id/libros", async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);

        if (!autor) {
            return res.status(404).json({ msg: "Autor no encontrado" });
        }

        const libros = await Libro.find({
            autor: autor.referencia
        });

        res.json(libros);

    } catch (error) {
        res.status(500).json({ msg: "Error al obtener libros del autor" });
    }
});

module.exports = router;