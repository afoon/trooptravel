
    const getAll = (req,res,next) =>{
            const db = req.app.get('db');
            db.getAll().then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
            res.status(500)}
        )}
    const getCurrUser = (req,res,next) =>{
        const db = req.app.get('db');
        if(req.user){
        db.getCurrUser([req.user.authid]).then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}
}
    const getUserTrips = (req,res,next) =>{
        const db = req.app.get('db');
        if(req.user){
        db.getUserTrips([req.user.authid]).then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}
}
    const getCurrTrip = (req,res,next) =>{
        const db = req.app.get('db');
        console.log(req.params.tripid)
        db.getCurrTrip([req.params.tripid]).then(response => {
            res.status(200).json(response)
        })      .catch(err => {
            res.status(500)} )
        }



    const getHousing = (req,res,next) =>{
            const db = req.app.get('db');
            console.log('housing stuff',req.params.tripid)
            db.getHousing([req.params.tripid]).then(response => 
                res.status(200).json(response))
        }


    const getTripGuest = (req,res,next) =>{
        const db = req.app.get('db');
        db.getTripGuest([req.params.tripid]).then(response => {
            console.log('guest', response)
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
    const createTrip = (req,res,next) =>{
        const db = req.app.get('db');
        db.createTrip(req.body.authid,req.body.location,req.body.start,req.body.end).then(response => {
            console.log('WTF???',response)
        db.addFirstGuest(response[0].admin,response[0].tripid)
        }).then(response => res.json(response))
        .catch(err => {
            console.log(err)
        res.status(500)}
    )}
    const addTripGuest = (req,res,next) =>{
        const db = req.app.get('db');
        db.addTripGuest([req.body.friend,req.params.tripid]).then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )}
    const createHousing = (req,res,next) =>{
        const db = req.app.get('db');
        const {tripid,authid,location,price,link,photourl} = req.body;
        db.createHousing(tripid,authid,location,price,link,photourl).then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(500)}
    )};
    const updateHousing = (req,res,next) =>{
        const db = req.app.get('db');
        const {id,name,price,location,link,photourl} = req.body
        db.updateHousing([id,name,price,location,link,photourl]).then(response => {res.status(200).json(response)
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
        db.deleteHousing([req.params.id]).then(response => res.status(200).json(response))
        .catch(err => res.status(500))
    }
    


    const removeTripUser = (req,res,next) =>{
        const db = req.app.get('db');
        
        db.removeTripUser([req.params.id]).then(response => res.status(200).json(response))
        .catch(err => res.status(500))
}




    module.exports = {
        getAll,
        getCurrUser,
        getUserTrips,
        getCurrTrip,
        getHousing,
        getTripGuest,
        createUser,
        createHousing,
        createTrip,
        deleteHousing,
        deleteTrip,
        updateHousing,
        updateTrip,
        removeTripUser,
        addTripGuest,
    }
