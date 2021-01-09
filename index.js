const express = require('express');
const path = require('path');
const port = 5000;
const app = express();
const db = require('./config/mongoose');

const Contact = require('./models/contact');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); //middle ware add button press
app.use(express.static('assets'));

var contactList = [
{
    name:"AYUSH",
    phone :"9065184052"
},
{
name :"Tony Stark",
phone:"93088474494"

},

{
name:"Coding Ninjas",
phone :"8475847847",
}

]


app.get('/',function(req,res)
{
Contact.find({},function(err,contacts){
if(err)
{
console.log('Error in fetching contacts from db');
return ;
}
return res.render('home',{
    title:"Contact List",
    contact_list:contacts
    });


})


})


app.get('/practice',function(req,res)
{
return res.render('practice')
});


app.post('/ak',function(req,res)
{
/*
    contactList.push({
     name :req.body.name,
     phone :req.body.phone
  
    })
    */
Contact.create({
    name:req.body.name,
    phone:req.body.phone
},function(err,newContact){
if(err)
{
    console.log('error in creating a contact');

return;

}
console.log('********',newContact);
return res.redirect('back');
});


});
// for deleting contact

app.get('/delete-contact/', function(req, res){
    console.log(req.query.id);
    let id = req.query.id

    Contact.findByIdAndRemove(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })


   
});

app.listen(port,function(err)
{
if(err)
{
 console.log('Error in running the server');
}
console.log('Chill Maro Server is running on port :',port)
});



