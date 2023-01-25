const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
main().catch(err=>console.log(err));
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/agriuserDB');
    const farmerSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        aadhar:String,
        address:String,
        City:String,
        State:String,
        pincode:String,
        Password:String
    });
    const Farmer=mongoose.model("Farmer",farmerSchema);
    const customerSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        address:String,
        City:String,
        State:String,
        pincode:String,
        Password:String
    });
    const Customer=mongoose.model("Customer",customerSchema);
    const businessSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        address:String,
        city:String,
        State:String,
        company:String,
        bphone:String,
        bemail:String,
        address:String,
        gstn:String,
        usertype:String,
        pincode:String,
        Password:String
    });
    const Business=mongoose.model("Business",businessSchema);
    const studentSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        aadhar:String,
        address:String,
        city:String,
        State:String,
        pincode:String,
        clgname:String,
        Password:String
    });
    const Student=mongoose.model("Student",studentSchema);
    
    
    

app.get("/",function(req,res){
   res.sendFile(__dirname+"/Homepage.html");
});
app.get("/signup.html",function(req,res){
res.sendFile(__dirname+"/signup.html")
});
app.get("/farmer.html",function(req,res){
    res.sendFile(__dirname+"/farmer.html");
});
app.post("/farmer.html",function(req,res){
    const farmer=new Farmer({
        name:req.body.name,
        username:req.body.name+"@farmer.in",
        DOB:req.body.dob,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        aadhar:req.body.aadhar,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        pincode:req.body.pincode,
        Password:req.body.password
    });
    farmer.save();
    res.redirect("/");
});
app.get("/customer.html",function(req,res){
    res.sendFile(__dirname+"/customer.html");
});
app.post("/customer.html",function(req,res){
    const customer=new Customer({
        name:req.body.name,
        username:req.body.name+"@customer.in",
        DOB:req.body.date,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        pincode:req.body.pincode,
        Password:req.body.password

    });
    customer.save();
    res.redirect("/");
});
app.get("/business.html",function(req,res){
    res.sendFile(__dirname+"/business.html");
});
app.post("/business.html",function(req,res){
    const business=new Business({
        name:req.body.name,
        username:req.body.name+"@business.in",
        DOB:req.body.date,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        company:req.body.company,
        bphone:req.body.bphone,
        bemail:req.body.bemail,
        gstn:req.body.gstn,
        usertype:req.body.usertype,
        pincode:req.body.pincode,
        Password:req.body.password
    });
    business.save();

})
app.get("/student.html",function(req,res){
    res.sendFile(__dirname+"/student.html");
});
app.post("/student.html",function(req,res){
    const student=new Student({
    name:req.body.name,
        username:req.body.name+"@student.in",
        DOB:req.body.dob,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        aadhar:req.body.aadhar,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        pincode:req.body.pincode,
        clgname:req.body.clgname,
        Password:req.body.password

    });
    student.save();

});
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login.html",function(req,res){
    let username=req.body.username;
    let userType=username.split("@")[1];
    console.log(userType);
    if(userType=="farmer.in"){
        Farmer.findOne({email:req.body.email},function(err,foundUser){

            if(err){
                console.log(err);
            }else{
                if(foundUser){
                    if(foundUser.Password===req.body.password){
                        console.log(foundUser.Password);
                        res.redirect("/")       
                    }
                }
            }
            });
        }
    if(userType=="customer.in"){
        Customer.findOne({email:req.body.email},function(err,foundUser){
            if(err){
                console.log(err);
            }else{
                if(foundUser){
                    if(foundUser.Password==req.body.password){
                        res.redirect("/");
                    }
                }else{
                    console.log("user not found");
                }
            }
        });

    }    
            if(userType=="business.in"){
                    Customer.findOne({email:req.body.email},function(err,foundUser){
                        if(err){
                            console.log(err);
                        }else{
                            if(foundUser){
                                if(foundUser.Password==req.body.password){
                                    res.redirect("/");
                                }
                            }else{
                                console.log("user not found");
                            }
                        }
                    });
                }  
                if(userType=="student.in"){
                    Customer.findOne({email:req.body.email},function(err,foundUser){
                        if(err){
                            console.log(err);
                        }else{
                            if(foundUser){
                                if(foundUser.Password==req.body.password){
                                    res.redirect("/");
                                }
                            }else{
                                console.log("user not found");
                            }
                        }
                    });
                }  
    }  
);
app.get("/buy.html",function(req,res){
    res.sendFile(__dirname+"/buy.html")
})
app.listen(3000,function(){
    console.log("hey my server is running");
});
}