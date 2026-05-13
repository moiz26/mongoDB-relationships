const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(()=>console.log("connection is successfull"))
    .catch((err)=> console.log(err))

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationsDemo");
}    



// Schemas:
const userSchema = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async() =>{

//     // // creating a user.
//     // let user1 = new User({
//     //     username: "Moiz",
//     //     email: "Moiz123@gmail.com"
//     // });

//     // // creating a post.
//     // let post1 = new Post({
//     //     content: "Hello I'm moiz.",
//     //     likes: 50,
//     // });

//     // //assigning a user to post1.
//     // post1.user = user1;

//     // // saving user and post.

//     // await user1.save();
//     // await post1.save();

//     // CREATING POST 2 FOR THE SAME USER.
//     let post2 = new Post({
//         content: "I'm looking for a web developer job.",
//         likes: 100,
//     });

//     // Finding the user to assing it to the post
//     let user1 = await User.findOne({username: "Moiz"});

//     //assiging user1 to the post2.
//     post2.user = user1;

//     // saving post2.
//     await post2.save();

// }
// addData();

const getData = async() =>{
    let result = await Post.find({}).populate("user");
    console.log(result);
}

getData();