const { db } = require('../../firebase-config');

exports.crear = async (req, res) => {
    try {
        const { codigo, semestre, grupo, fecha, horaInicio } = req.body;
        
        const docRef = await db.collection('asistencias').add({
            codigoAsignatura: codigo,
            semestre,
            grupo,
            fecha,
            horaInicio,
            estudiantes: [],
            fechaCreacion: admin.firestore.FieldValue.serverTimestamp()
        });
        
        res.status(201).json({
            mensaje: "Lista de asistencia creada exitosamente",
            id: docRef.id
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        const { codigo, fecha, horaInicio, estudiantes } = req.body;
        
        const query = await db.collection('asistencias')
            .where('codigoAsignatura', '==', codigo)
            .where('fecha', '==', fecha)
            .where('horaInicio', '==', horaInicio)
            .get();
            
        if (query.empty) {
            return res.status(404).json({ error: 'Lista de asistencia no encontrada' });
        }
        
        await query.docs[0].ref.update({ estudiantes });
        
        res.json({ mensaje: "Asistencia actualizada exitosamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};