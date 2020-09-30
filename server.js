const express = require('express');
const bodyParser = require('body-Parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); // knexjs.org

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({ 			// initailizing the library
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Navneet',
    database : 'smartbrain'
  }
});

db.select('*').from ('users').then(data=>{
	console.log(data);
});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

const database = {
				users:[
						{
							id: '123',
							name: 'john',
							email: 'john@gmail.com',
							password: 'cookies',
							entries: '0',
							joined: new Date()
						},
						{
							id: '124',
							name: 'sally',
							email: 'sally@gmail.com',
							password: 'apples',
							entries: '0',
							joined: new Date()
						}
					]
				}

app.get('/', (req, res)=>{
	res.send (database.users);
})


app.post('/signin' , (req, res)=>{signin.handleSignin(req,res,db,bcrypt)})
// bcrypt.compare("cookies", '$2a$10$ZZQ10vmOs.U06O4fELLmfu5etBZoHvs38Wp6Ufh3c1rHDF3qwgWzC', function(err, res){
// 	console.log(res);
// }) 

// bcrypt.compare("veggies" , '$2a$10$ZZQ10vmOs.U06O4fELLmfu5etBZoHvs38Wp6Ufh3c1rHDF3qwgWzC', function(err, res){
// 	console.log("second guess", res)
// })

// if(req.body.email=== database.users[0].email &&
//    req.body.password === database.users[0].password)
// {
// res.json(database.users[0]);
// }else{
// 	res.status(400).json("Error")
// }


app.post('/register', (req, res) =>{register.handleRegister(req,res,db,bcrypt)}) 
// bcrypt.hash(password, null, null, function(err, hash){
// 	console.log(hash)
// });

 // database.users.push({
//  	id: '125',
// 	name: name,
// 	email: email,
// 	entries:0,
// 	joined: new Date()
// 	 })
	


app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})
// database.users.forEach(user=>{
// 	if(user.id ===id){
// 		found = true;
// 		return res.json(user);
// 	}	
// 	})

	// if(!found){
	// 	res.status(404).json("user not found");
	// }	

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})

// let found = false;
// database.users.forEach(user=>{
// 	if(user.id ===id){
// 		found = true;
// 		user.entries++;
// 		return res.json(user.entries);
// 	}	
// 	})

// 	if(!found){
// 		res.status(404).json("not found");
// }
// })



app.listen (3001,()=>{
	console.log("app is running on port 3001");
})