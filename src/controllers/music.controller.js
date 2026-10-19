const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const {uploadFile} = require("../services/storage.service")
 
async function createMusic (req, res){
    const token = req.cookies.token;
    if(!token){
        return res.status(403).json({
            message:"Please Login to create Music"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "artist"){
            return res.status(403).json({
                message:"Only Artists can create Music"
            })
        }
    

    const {title} = req.body;
    const file = req.file;
    const result = await uploadFile(file.buffer.toString("base64")); 
    const music = await musicModel.create({
        uri:result.uri,
        title,
        artist:decoded.id
    })
    res.status(201).json({
        message:"Music Created Successfully",
        music:{
            id:music._id,
            uri:music.uri,
            artist:music.artist,
            title:music.title
        }
    })
    }catch(err){
        return res.status(401).json({
            message:"UnAuthorized"
        })
    }
}
module.exports ={createMusic};