const { db } = require('../../firebase-config');

exports.consultar = async (req, res) => {
    try {
        const snapshot = await db.collection('departamentos').get();
        const departamentos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(departamentos[0] || { nombre: "Departamento no encontrado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        
        const snapshot = await db.collection('departamentos').get();
        if (!snapshot.empty) {
            await snapshot.docs[0].ref.update({ nombre: nuevoNombre });
        } else {
            await db.collection('departamentos').add({
                nombre: nuevoNombre,
                fechaModificacion: admin.firestore.FieldValue.serverTimestamp()
            });
        }
        
        res.json({ mensaje: "Departamento modificado exitosamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};