const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')

const Url = require('../models/Url')

router.post('/shorten',async (req, res)=>{
    console.log('shortening link')
    const {longUrl } = req.body
    const baseUrl = config.get('baseUrl')

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url')
    }

    // create url code
    const urlCode = shortid.generate()

    // check long url
    if(validUrl.isUri(longUrl)) {
        try{
            let url = await Url.findOne({ longUrl })
            if(url) {
                res.json(url)
            } else{
                const shortUrl = baseUrl + '/' + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                })
                await url.save()
                res.json(url)
            }
        } catch(e){
            console.log(e)
            res.status(500).json('Internal server error')
        }
    } else{ 
         res.status(401).json('Invalid long url')
    }
})
module.exports = router