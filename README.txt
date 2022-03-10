ReadBooksOnline


Video Link - 
	https://youtu.be/8ESK0hKoLsQ


Instructions for Building & Running - 
	run npm install in back/
	run npm install in front/
	run npm install in front/app

	create a data directory in back/app

	create an instance of a local mongodb through the use of a locally specified mongod.exe, 
	and specify the dbpath being the data folder that was created
	
	after the database is running, run nodemon server.js in back/
	once the server is up and running, open a third terminal and direct to front/app and run npm start

	at this point a mongodb instance, server and client should all be up and running
	
	when the server is running, it will auto-create the roles and some books in the database for you
	users can be populated through the use of siging up on the application.

	For changing a users role to higher authority like moderator or admin, open up mongoDBCompass,
	change the users role reference to the id of the role you want, so for example to make a user admin,
	copy the admin role id and then overwrite the users existing role id reference with the new one and,
	the user will now have a different authority in the application.

	For running unit tests, go to front/app/ then run npm test

VM Info - 
	All node modules are installed on VM
	
	Here are the paths to create an MongoDB instance - 
	
		---

	
	
	