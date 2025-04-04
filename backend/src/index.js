import "dotenv/config";
import dotenv from "dotenv";
import {connectDB} from "./db/index.js";
import app from "./app.js";

dotenv.config(
    {path : "../.env"}
);

connectDB()
.then(() =>{
    const port = process.env.PORT || 5000;
    app.listen(port , () =>{
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.log("mongoDB error found : ",err);
});

app.get("/",(req,res)=>{
    res.send("server started");
})