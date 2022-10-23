const Joi = require("joi");
const mongoose  = require("mongoose");

const artistSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        nationality: String
    }
)

const songSchema = new mongoose.Schema(
    {
        title: String,
        artist:String,
        release_year: Number,
        artist: artistSchema,
        edition:String,
        price: Number
    }
)

function Validatesong(song)
{
    const artistJoiSchema = Joi.object({
        name: Joi.string().min(2).required().messages({"any.required" : "artist name is a required field"}),
        nationality: Joi.string()
    })

    const songJoiSchema = Joi.object({
        title: Joi.string().min(3).required().messages({"any.required" : "Title field is required"}),
        artist: artistJoiSchema,
        release_year: Joi.number().integer().min(1600).messages({"number.base" : "Year value must be a number"}),
        price: Joi.number().min(1),
        edition: Joi.string()
    })
    return songJoiSchema.validate(song);
}

const song = mongoose.model('song', songSchema);

module.exports = {song, Validatesong}