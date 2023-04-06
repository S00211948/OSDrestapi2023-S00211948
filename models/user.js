const Joi = require("joi");
const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema(
{
    username:String,
    name:String,
    email:String,
    password:String,
    records:[recordSchema],
    wishlist:[recordSchema]
})

const recordSchema = new mongoose.Schema(
    {
        title: String,
        artist:String,
        coverArt: String
    }
)

function validateRecord(record)
{
    const recordJoiSchema = Joi.object({
        title: Joi.string().min(3).required().messages({"any.required" : "Album Title field is required"}),
        artist: Joi.string().min(3).required().messages({"any.required" : "Artist field is required"}),
        coverArt: Joi.string()
    })
}