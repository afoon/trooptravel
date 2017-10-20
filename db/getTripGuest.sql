select * from user_trips
join users on user_trips.authid = users.authid 
where tripid =$1