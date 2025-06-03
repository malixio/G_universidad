const { db } = require('../../firebase-config');
const { db, admin } = require('../../firebase-config');  // Agregar admin
exports.consultar = async (req, res) => {
    try {
        const { codigo, grupo, semestre } = req.query;
        
        const query = await db.collection('asignaturas')
            .where('codigo', '==', codigo)
            .where('grupo', '==', grupo)
            .where('semestre', '==', semestre)
            .get();
            
        if (query.empty) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }
        
        res.json({
            id: query.docs[0].id,
            ...query.docs[0].data()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.ingresar = async (req, res) => {
    try {
        const { nombre, codigo, creditos, grupo, semestre } = req.body;
        
        const docRef = await db.collection('asignaturas').add({
            nombre,
            codigo,
            creditos: parseInt(creditos),
            grupo,
            semestre,
            fechaRegistro: admin.firestore.FieldValue.serverTimestamp()
        });
        
        res.status(201).json({
            mensaje: "Asignatura registrada exitosamente",
            id: docRef.id
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};