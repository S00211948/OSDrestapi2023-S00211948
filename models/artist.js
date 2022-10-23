const Joi = require("joi");
const mongoose  = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        title: String,
        artist:String,
        release_year: Number
    }
)

const albumSchema = new mongoose.Schema(
    {
        title: String,
        artist:String,
        release_year: Number,
        songs:[songSchema]
    }
)

const artistSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        nationality: String,
        year_formed: Number,
        albums:[albumSchema]
    }
)

function ValidateArtist(artist)
{
    const songJoiSchema = Joi.object({
        title: Joi.string().min(3).required().messages({"any.required" : "Title1 field is required"}),
        artist: Joi.string(),
        release_year: Joi.number().integer().min(1600).messages({"number.base" : "Year value must be a number"}),
    })

    const albumJoiSchema = Joi.object({
        title: Joi.string().min(3).required().messages({"any.required" : "Title2 field is required"}),
        artist: Joi.string(),
        release_year: Joi.number().integer().min(1600).messages({"number.base" : "Year value must be a number"}),
        songs: Joi.array().items(songJoiSchema)
    })

    const artistJoiSchema = Joi.object({
        name: Joi.string().min(2).required().messages({"any.required" : "artist name is a required field"}),
        nationality: Joi.string(),
        year_formed: Joi.number().integer().min(1600),
        albums: Joi.array().items(albumJoiSchema)
    })
    return artistJoiSchema.validate(artist);
}

const Artist = mongoose.model('artist', artistSchema);

module.exports = {Artist, ValidateArtist}