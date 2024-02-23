"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresss = require('express');
const router = expresss.Router();
const ostData = require('../controllers/ostsGen');
router.get('/', (req, res) => {
    res.json(ostData);
    console.log('Songs requested.'); //delete later;.
});
module.exports = router;
