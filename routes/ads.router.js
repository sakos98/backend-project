const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload');

const AdsController = require('../controller/ads.controller');

//GET /api/ads – który zwróci wszystkie ogłoszenia,
router.get('/ads', AdsController.getAll);

// GET /api/ads/:id – który zwróci konkretne ogłoszenie,
router.get('/ads/:id', AdsController.getAdsId);

// POST /api/ads – do dodawania nowego ogłoszenia,
router.post('/ads', imageUpload.single('photo'), AdsController.addAds);

// DELETE /api/ads/:id – do usuwania ogłoszenia,
router.delete('/ads/:id', AdsController.deleteAds);

// PUT lub PATCH /api/ads/:id – do edycji ogłoszenia,
router.put('/ads/:id', imageUpload.single('photo'), AdsController.updateAds);

// GET /api/ads/search/:searchPhrase – który zwróci ogłoszenia pasujące tytułem do podanej frazy,
router.get('/ads/search/:searchPhrase', AdsController.getFindOneAds);

module.exports = router;