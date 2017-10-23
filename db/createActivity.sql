INSERT INTO activity (creatinguser,tripid,
        name,location,price,link,description,time,photourl) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *;