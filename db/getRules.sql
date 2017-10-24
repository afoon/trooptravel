select * from tripguidelines
join users on users.authid=tripguidelines.creatinguser where tripid=$1;