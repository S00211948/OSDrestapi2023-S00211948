const express = require('express');
const {Album, ValidateAlbum} = require('../models/artist');

const router = express.Router();

   /*router.get('/', async (req, res) => {
  
    try {
      const { name, year_formed, limit} = req.query;
      let filter = {};
  
      if (name) {
        filter.name = { $regex: `${title}`, $options: 'i' }
      }

      const yearNumber = parseInt(year_formed)

      if (!isNaN(yearNumber) ) {
        Number.isInteger(year_formed)
          filter.year_formed = yearNumber
      }

      let limitNumber = parseInt(limit)
      if (isNaN(limitNumber)) {
        limitNumber = 0
      }
    
      console.table([{Name:filter.name, Year:filter.year_formed}]);    

      const artists = await Artist
      .find(filter)
      .limit(limitNumber)
      .sort({year_formed:1})
      //.select("name nationality year_formed");
      res.json(artists);
    }
    catch (error){
      console.log(error);
      res.status(500).json('db error')
    }
  })
  
  router.get('/:id',async (req,res) => {
     let id = req.params.id;
  
     try
     {
      const artist = await Artist.findById(req.params.id);
      if(artist)
      {
        res.json(artist);
      }
      else
      {
        res.status(404).json('Not found')
      }
     }
     catch (error)
     {
      res.status(404).json('Not found: id is weird ' + error);
     }
  })
  
  
  router.post('/', async (req, res) => {

    let result = ValidateArtist(req.body);
    if(result.error)
    {
      res.status(400).json(result.error);
      return;
    }

    let artist = new Artist(req.body);

    try
    {
      artist = await artist.save();
      res
      .location(`${artist._id}`)
      .status(201)
      .json(artist)
    }
    catch (error)
    {
      res.status(500).send('db_error ' + error)
    }
  })
  
  
  router.delete('/:id', async(req, res) =>
   {
    try 
    {
      const artist = await Artist.findByIdAndDelete(req.params.id);
      if (artist)
        res.status(204).send();
      else
        res.status(404).json(`artist with that ID ${req.params.id} was not found`)
    }
    catch 
    {
      res.status(404).json(`funny id ${req.params.id} was not found`);
    }
  
    })*/

    router.put('/:id', async(req,res) =>
    {
      console.log("put request started")
      let result = ValidateAlbum(req.body);
      if(result.error)
      {
        res.status(400).json(result.error);
        return;
      }
      try
      {
        const album = await Album.findByIdAndUpdate(req.params.id, req.body);
        if(album)
          res.status(204).json(album);
        else
          res.status(404).json(`album with that ID ${req.params.id} was not found`)
      }
      catch
      {
        res.status(404).json(`funny id ${req.params.id} was not found`);
      }
    })

    module.exports = router