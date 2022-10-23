const express = require('express');
const {Artist, ValidateArtist} = require('../models/artist');

const router = express.Router();

   router.get('/', async (req, res) => {
  
    try {
      const { title, release_year, limit, pagenumber, pagesize } = req.query;
      let filter = {};
  
      if (title) {
        filter.title = { $regex: `${title}`, $options: 'i' }
      }

      const yearNumber = parseInt(release_year)

      if (!isNaN(yearNumber) ) {
        Number.isInteger(release_year)
          filter.release_year = yearNumber
      }

      let limitNumber = parseInt(limit)
      if (isNaN(limitNumber)) {
        limitNumber = 0
      }

      let pageSizeNumber = parseInt(pagesize);

      if (isNaN(pageSizeNumber)) {
        pageSizeNumber = 0
      }
      let pageNumberNumber = parseInt(pagenumber);
    
      if (isNaN(pageNumberNumber)) {
        pageNumberNumber = 1
      }
    
      console.table([{Title:filter.title, Year:filter.release_year}]);    

      const artists = await Artist
      .find(filter)
      .limit(limitNumber)
      .sort({release_year:1})
      .skip((pageNumberNumber -1)*pageSizeNumber)
      .select('title release_year');
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
  
    })

    router.put('/:id', async(req,res) =>
    {
      let result = ValidateArtist(req.body);
      if(result.error)
      {
        res.status(400).json(result.error);
        return;
      }
      try
      {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body);
        if(artist)
          res.status(204).json(artist);
        else
          res.status(404).json(`artist with that ID ${req.params.id} was not found`)
      }
      catch
      {
        res.status(404).json(`funny id ${req.params.id} was not found`);
      }
    })

    module.exports = router