var express=require('express');
var app=express();
var mongoClient=require('mongodb').MongoClient;
var alert = require('alert-node');
var db;
mongoClient.connect('mongodb://127.0.0.1:27017',function(err,client){
    if(err) throw err;
    db=client.db('Movies');
});
app.use(express.static('public'));
app.post('/show',function(req,res){
    db.collection('track').find().toArray(function(err,result){
        res.json(result);
    })
})
app.post('/insert',function(req,res){
    let x=[{
        name: "Harry Potter and the Order of the Phoenix",
        img: "https://bit.ly/2IcnSwz",
        summary: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
    }, {
        name: "The Lord of the Rings: The Fellowship of the Ring",
        img: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg",
        summary: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
    }, {
        name: "Avengers: Endgame",
        img: "https://bit.ly/2Pzczlb",
        summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
    }];

    db.collection('track').find().toArray(function(err,result){

        if(result.length===0){
            db.collection('track').insert(x,function(err,result){

                alert('Data Inserted Successfully')
         
                res.redirect('/');
            });

        }
        else{
            alert('Data Already Inserted Successfully');
            res.redirect('/');


        }
      
    })

});

app.listen(3000);