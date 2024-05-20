import mongoose from "mongoose"

export function conn(){
    mongoose.connect("mongodb+srv://milad:SK3d3QWXseAZgR0x@cluster0.lhwsef7.mongodb.net/user-auth").then(()=>{
        console.log("connected......");
    }).catch((err)=>{
        console.log("error......",err);
    })

}
//mongodb+srv://milad:SK3d3QWXseAZgR0x@cluster0.lhwsef7.mongodb.net/user-auth
