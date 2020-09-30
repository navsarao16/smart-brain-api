const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: 'c34451bb46db46b08b8e3d1714bdf28d'
});
const handleApiCall =(req, res)=>{
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data=>{
	res.json(data);
})
.catch(err=> res.status(400).json("unable to work Api"))
}

const handleImage= (req, res ,db)=>{
const { id } = req.body;

db('users').where('id', '=', id)
.increment('entries', 1)
.returning('entries')
.then(entries=>{
	res.json(entries);
}).catch(err=> res.status(400).json('unable to get entries'))
}
module.exports={
	handleImage: handleImage
}
module.exports={
	handleImage: handleImage
}