INSERT INTO trips (admin,location,start,enddate) VALUES ($1,$2,$3,$4) returning *;