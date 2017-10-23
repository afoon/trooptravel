select * from users_activities
join users on users_activities.authid = users.authid 
where tripid =$1;