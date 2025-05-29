//here is where all the data is loaded and all the helper functions are described

// 1. Bringing in our mongo client form the mongo.js file
// 2. Creating the helper functions for the CRUD operations that are supposed to be done 
// 3. Thats it just export and you are all done for the day bro

import { client , ObjectId } from "../server/mongo";
const uri = process.env.MONGO_KEY
console.log(uri);

let db = client.db("todo")
let collection =  db.collection("todo")

//helper function for getting results from the database

export async function getTodos() {
    let todos =  await collection.find().toArray();
    return todos;
}


//helper function for creating new product in the database using the CRUD operation


export async function createNewProduct(todos) {
    let newTodo = await collection.insertOne().toString();
    return newTodo
}
