
    const getAll = (req,res,next) =>{
        const db = req.app.get('db');
        db.getAllUsers().then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}

    const createUser = (req,res,next) =>{
        const db = req.app.get('db');
        db.createUser().then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}

    module.exports = {
        getAll,
        createUser
    }