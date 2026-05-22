const express = require("express");
const router = express.Router();
const Libro = require("../models/Libro");

router.get("/", async (req, res) => {
    try {
        let query = Libro.find();

        if (req.query.sort === "titulo") {
            query = query.sort("titulo");
        }

        const libros = await query;
        res.json(libros);

    } catch (error) {
        res.status(500).json({ msg: "Error al obtener libros" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);

        if (!libro) {
            return res.status(404).json({ msg: "Libro no encontrado" });
        }

        res.json(libro);

    } catch (error) {
        res.status(500).json({ msg: "Error al buscar libro" });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevo = new Libro(req.body);
        await nuevo.save();

        res.status(201).json(nuevo);

    } catch (error) {
        res.status(500).json({ msg: "Error al crear libro" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const actualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!actualizado) {
            return res.status(404).json({ msg: "Libro no encontrado" });
        }

        res.json(actualizado);

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar libro" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const eliminado = await Libro.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return res.status(404).json({ msg: "Libro no encontrado" });
        }

        res.json({ msg: "Libro eliminado" });

    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar libro" });
    }
});

module.exports = router;