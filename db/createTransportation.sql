INSERT INTO transportation (tripid,creatinguser,type,
      departure,
      departuretime,
      arrival,
      arrivaltime,photo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *;