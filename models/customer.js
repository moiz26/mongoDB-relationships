const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(()=>console.log("connection is successfull"))
    .catch((err)=> console.log(err))

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationsDemo");
}    



// Schemas:
const orderSchema = new Schema({
    item:{
        type: String,
        unique: true
    },
    price: Number
});

const customerSchema = new Schema({
    name:{
        type: String,
        unique: true
    },
    orders:[
        {
            type:Schema.Types.ObjectId, //type = objestID 
            ref:"Order" //ref is used for referencec, objectID is taken from "Order" model.
        },
    ],
});


//a.pre middleware:
// customerSchema.pre("findOneAndDelete", async() =>{
//     console.log("PRE Middleware")    
// });
//b.post middleware:
customerSchema.post("findOneAndDelete", async(data) =>{
    if(Customer.orders.length){
        Order.deleteMany({});
    }
});


//models:
const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);


// Dynamic search function.
 const searchExisting = async(field, value)=>{
            let customer = await Customer.findOne({[field]: value});
            return customer;
        }

const addCustomer = async()=>{
    try{
        //Dynamic duplicate check.
        let existingCustomer = await searchExisting("name", "Ramu");
        if(existingCustomer){
            console.log("Customer already exists");
            return;
        }

//         let cus1 = new Customer({
//             name:"moiz",
//         });

//         // extracting orders from the "Order" model.
//         let order1 = await Order.findOne({item:"samosa"});
//         let order2 = await Order.findOne({item:"chocolate"});

//         console.log("order1 = ",order1);
//         console.log("order2 = ",order2);

//         // pushing extracted "Order" data into the "cus1.orders".
//         cus1.orders.push(order1);
//         cus1.orders.push(order2);

//         let res = await cus1.save();
//         console.log("Customer saved successfully");


//         let fetch = await Customer.find({}).populate("orders");
//         console.log(fetch); 


        // function to add customer.

            let newCustomer = new Customer({
                name:"Ramu"
            });

            let newOrder = new Order({
                item:"Burger",
                price: 200
            });

            newCustomer.orders.push(newOrder);

            await newOrder.save();
        let res =  await newCustomer.save();


    }catch(err){
        if(err.code === 11000){
            console.log("Duplicate data insesrtion attempted");
        }else{
            console.log(err.message);
        }
    }
}
// addCustomer();

// // To Insert orders into the Order collection
// const addOrders = async ()=>{
//     let res = await Order.insertMany([
//         {item: "samosa", price: 15},
//         {item: "chips", price: 10},
//         {item: "chocolate", price: 50}]
//     );
//     console.log(res);
// };

// addOrders();



// HANDLING DELETION
// IF CUSTOMER IS REMOVED/DELETED THEN ALL ITS RELATED DATA(ORDERS) WILL ALSO BE DELETED.
const delCustomer = async() =>{
    let data = await Customer.findByIdAndDelete("6a043b15510383d8c8740458");
    console.log(data);
}
delCustomer();

//  The above function only delets the user from the "Users" collection, not its roder data.
// so use mogooese middleware
// a. pre - run begore the query is executed.
// b. post - run after the query is executed.
// NOTE: middleware is written before the models (above).