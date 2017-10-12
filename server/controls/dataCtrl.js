
    const getAll = (req,res,next) =>{
        const db = req.app.get('db');
        if(req.user){
        db.getCurrUser([req.user.authid]).then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}}
    const getUserTrips = (req,res,next) =>{
        const db = req.app.get('db');
        if(req.user){
        db.getUserTrips([req.user.authid]).then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}}
    const createUser = (req,res,next) =>{
        const db = req.app.get('db');
        db.createUser().then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}
    const createTrip = (req,res,next) =>{
        const db = req.app.get('db');
        db.createTrip([req.body.authid,req.body.location,req.body.start,req.body.end]).then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
        res.status(500)}
    )}
    const addTripGuest = (req,res,next) =>{
        const db = req.app.get('db');
        db.addTripGuest([req.body.friend,req.body.trip]).then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}
    const createHousing = (req,res,next) =>{
        const db = req.app.get('db');
        db.createHousing().then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}
    const updateHousing = (req,res,next) =>{
        const db = req.app.get('db');
        const {id,name,price,location,link} = req.params
        db.updateHousing([id,name,price,location,link]).then(response => {res.status(200).json(response)
        })
        .catch(err => {
        res.status(500);
    });
    };
    const updateTrip = (req,res,next) =>{
        const db = req.app.get('db');
        const {id,location,dates} = req.params
        db.updateTrip([id,location,dates]).then(response => {res.status(200).json(response)
        })
        .catch(err => {
        res.status(500);
    });
    };
    const deleteTrip = (req,res,next) =>{
        const db = req.app.get('db');
        db.deleteTrip([req.params.id]).then(response => {res.status(200).json(response)
        })
        .catch(err => {
        res.status(500);
    });
    };
    const deleteHousing = (req,res,next) =>{
        const db = req.app.get('db');
        db.deleteHousing([req.params.id]).then(response => {res.status(200).json(response)
        })
        .catch(err => {
        res.status(500);
    });
    };
    const removeTripUser = (req,res,next) =>{
        const db = req.app.get('db');
        db.removeTripUser([req.params.id]).then(response => {res.status(200).json(response)
        })
        .catch(err => {
        res.status(500);
    });
    };

    module.exports = {
        getAll,
        getUserTrips,
        createUser,
        createHousing,
        createTrip,
        deleteHousing,
        deleteTrip,
        updateHousing,
        updateTrip,
        removeTripUser,
        addTripGuest
    }