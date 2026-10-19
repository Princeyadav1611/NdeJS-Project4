require("dotenv").config();
const {ImageKit} = require("@imagekit/nodejs")
const imageKitClient = new ImageKit({
    privateKey:process.env.IMGKIT_PVT
})
async function uploadFile(file) {
    const result = await imageKitClient.files.upload({
        file,
        fileName:"Music_"+Date.now(),
        folder:"backend/music"
    })
    return result;
}
module.exports = {uploadFile};