const express = require("express");
const router = express.Router();
const path = require("path");
const fs =require('fs')
const pathToMeta = path.join(__dirname, '..', 'public', 'data', 'crypto-meta.json')
const coinMeta = JSON.parse(fs.readFileSync(pathToMeta, {encoding: 'utf8', flag: 'r'}))
let metaArray = Object.values(coinMeta)

router.get("/:name", (req, res) => {

  const coinName = req.params.name
  const coin = metaArray.find(coin => coin.slug === coinName.toLowerCase())

  if(!coin){
    return res.status(404).json({error: 'Coin not found'})
  }

  res.status(200).render('coin', {
    coin: {
      name: coin.name,
    symbol: coin.symbol,
    description: coin.description,
    website_link: coin.urls.website[0] || '#',
    twitter_link: coin.urls.twitter[0] || '#',
    facebook_link: coin.urls.facebook[0] || '#',
    reddit_link: coin.urls.reddit[0] || '#',
    code_link: coin.urls.source_code,
  }
  });
});

module.exports = router;