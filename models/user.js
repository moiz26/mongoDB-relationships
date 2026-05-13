const mongoose = require("mongoose");
const {Schema} = mongoose;

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationsDemo")
    console.log("connection successful");
    addUsers();
}
main().catch((err) =>console.log(err));
// one to few relationship
const userSchema = new Schema({
    username: String,
    addresses:[
        {
            _id: false,
            location: String,
            city: String,
        },
    ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async() =>{
    try{
        let user1 = new User({
        username: "sherlockholmes",
        addresses:[
            {
                location: "221b baker street",
                city: "London"
            }]
        });

        user1.addresses.push({location:"p32 wallstreet", city:"London"});
        let save = await user1.save();
        console.log(save)
    }catch(err){
        console.log(err.message);
    }
}

