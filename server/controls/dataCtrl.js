const getAll = (req, res, next) => {
  const db = req.app.get("db");
  db
    .getAll()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500);
    });
};
const getCurrUser = (req, res, next) => {
  const db = req.app.get("db");
  if (req.user) {
    db
      .getCurrUser([req.user.authid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({ err: 'NoUserFound' });
      });
  }else {
    return res.status(500).json({ err: 'NoUserFound' })
  }
  
};
const getUserTrips = (req, res, next) => {
  const db = req.app.get("db");
  if (req.user) {
    db
      .getUserTrips([req.user.authid])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500);
      });
  }
};
const getCurrTrip = (req, res, next) => {
  const db = req.app.get("db");
  db
    .getCurrTrip([req.params.tripid])
    .then(response => {
      res
        .status(200)
        .json(response)
        .redirect("/#/main");
    })
    .catch(err => {
      res.status(500);
    });
};

const getHousing = (req, res, next) => {
  const db = req.app.get("db");
  db
    .getHousing([req.params.tripid])
    .then(response => res.status(200).json(response));
};

const getTripGuest = (req, res, next) => {
  const db = req.app.get("db");
  db
    .getTripGuest([req.params.tripid])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500);
    });
};

const createUser = (req, res, next) => {
  const db = req.app.get("db");
  db
    .createUser()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500);
    });
};
const createTrip = (req, res, next) => {
  const db = req.app.get("db");
  db
    .createTrip(
      req.body.authid,
      req.body.location,
      req.body.start,
      req.body.end
    )
    .then(response => {
      console.log("WTF???", response);
      db.addFirstGuest(response[0].admin, response[0].tripid);
    })
    .then(response => res.json(response))
    .catch(err => {
      console.log(err);
      res.status(500);
    });
};
const addTripGuest = (req, res, next) => {
  const db = req.app.get("db");
  db.addTripGuest([req.body.authid, req.params.tripid]).then(response => {
    if (response.length === 0) {
      db
        .addFirstGuest([req.body.authid, req.params.tripid])
        .then(response => {
          res.status(200).json(response);
        })
        .catch(err => {
          res.status(500);
        });
    }
  });
};

const createHousing = (req, res, next) => {
  const db = req.app.get("db");
  const {
    tripid,
    authid,
    location,
    price,
    link,
    photourl,
    submittedby
  } = req.body;
  if (photourl == undefined) {
    var photo = "../img/housing_placeholder.png";
  }
  if (photourl != undefined) {
    var photo = photourl;
  }
  db
    .createHousing(tripid, authid, location, price, link, photo, submittedby)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500);
    });
};
const updateHousing = (req, res, next) => {
  const db = req.app.get("db");
  const { id, price, location, link, photourl } = req.body;
  db
    .updateHousingInfo(id, price, location, link, photourl)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500);
    });
};
const updateTrip = (req, res, next) => {
  const db = req.app.get("db");
  const { tripid, location, start, end } = req.body;
  db
    .updateTripInfo([tripid, location, start, end])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500);
    });
};
const deleteTrip = (req, res, next) => {
  const db = req.app.get("db");
  console.log("delete", req.params.id);
  db
    .deleteTrip([req.params.id])
    .then(response => {
        res.redirect('/#/main')
    })
    .catch(err => {
      res.status(500);
    });
};
const deleteHousing = (req, res, next) => {
  const db = req.app.get("db");
  db
    .deleteHousing([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500));
};

const removeTripUser = (req, res, next) => {
  const db = req.app.get("db");

  db
    .removeTripUser([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500));
};

const upvote = (req, res, next) => {
  const db = req.app.get("db");
  db
    .upVote([req.body.id, req.body.upvote])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500));
};
const downvote = (req, res, next) => {
  const db = req.app.get("db");
  db
    .downVote([req.body.id, req.body.downvote])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500));
};

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
  upvote,
  downvote
};
