const express = require('express');
const {Artist, Song, ValidateArtist} = require('../models/artist');

const router = express.Router();

   router.get('/', async (req, res) => {
  
    try {      
      const { name } = req.query;
      let filter = {};
  
      if (name) {
        filter.name = { $regex: `${name}`, $options: 'i' }
      }


      var songs = [];
      const artists = await Artist.find(filter).select('albums');

      artists.forEach(album => {
        var subDocs = album.$getAllSubdocs()
        subDocs.forEach(song => {
          songs += song
        });
      });

      res.json(songs);
    }
    catch (error){
      console.log(error);
      res.status(500).json('db error')
    }
  })

  module.exports = router