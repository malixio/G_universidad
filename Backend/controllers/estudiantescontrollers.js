const { db } = require('../../firebase-config');

exports.consultar = async (req, res) => {
    try {
        const { tipoDoc, numDoc } = req.query;
        
        if (!tipoDoc || !numDoc) {
            const snapshot = await db.collection('estudiantes').get();
            const estudiantes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return res.json(estudiantes);
        }
        
        const query = await db.collection('estudiantes')
            .where('tipoDocumento', '==', tipoDoc)
            .where('numeroDocumento', '==', numDoc)
            .get();
            
        if (query.empty) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
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
        const { nombre, tipoDocumento, numeroDocumento } = req.body;
        
        const docRef = await db.collection('estudiantes').add({
            nombre,
            tipoDocumento,
            numeroDocumento,
            fechaRegistro: admin.firestore.FieldValue.serverTimestamp()
        });
        
        res.status(201).json({ 
            mensaje: "Estudiante registrado exitosamente",
            id: docRef.id
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};