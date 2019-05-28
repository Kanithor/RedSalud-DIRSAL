const express = require('express');
const router = express.Router();



router.get('/', areaController.getArea);

module.exports = router;