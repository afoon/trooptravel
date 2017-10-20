SELECT * FROM trips
JOIN user_trips ON trips.tripid = user_trips.tripId
WHERE authid = $1