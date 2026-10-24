const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model")
const {uploadFile} = require("../services/storage.service")
 
async function createMusic (req, res){
    const {title} = req.body;
    const file = req.file;
    const result = await uploadFile(file.buffer.toString("base64")); 
    const music = await musicModel.create({
        url:result.url,
        title,
        artist:req.user.id
    })
    res.status(201).json({
        message:"Music Created Successfully",
        music:{
            id:music._id,
            url:music.url,
            artist:music.artist,
            title:music.title
        }
    })
}

async function createAlbum (req, res) {
        const {title, musics} = req.body;
        const album = await albumModel.create({
            title,
            artist:req.user.id,
            musics:musics
        })
        res.status(201).json({
            message:"Album Created Successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics
            }
        })
}

async function getAllMusics (req, res){
    const music = await musicModel.find().populate("artist", "username role")
    res.status(200).json({
        message:"Musics fetched Successfully",
        musics:music
    })
}

async function getAllAlbums (req, res){
  const albums = await albumModel.find().select("title artist").populate("artist", "username email");
  res.status(200).json({
    message:"Albums Fetched Successfully",
    albums:albums
  })
}

async function getAlbumById(req, res) {
    const albumId = req.params.albumId;
    const album = albumModel.findById(albumId).populate("artist", "username email").populate("musics");
    return res.status(200).json({
        message:"Album's Music fetched Successfully",
        album:album
    })
}
module.exports ={createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById};