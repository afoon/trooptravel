SELECT * FROM friends
JOIN users ON users.authid = friends.friend
WHERE main = $1;
