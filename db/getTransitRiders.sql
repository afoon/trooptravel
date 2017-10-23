select * from users_transport
join users on users_transport.authid = users.authid 
where tripid =$1;