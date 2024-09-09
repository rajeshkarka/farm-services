const express = require('express');
const router = express.Router();
const productionController = require('../controllers/ProductionController');

/**
 * @swagger
 * /production:
 *   post:
 *     summary: Record daily egg production
 *     description: Record the number of eggs produced daily
 *     tags: [Production]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               totalEggs:
 *                 type: integer
 *               damagedEggs:
 *                 type: integer
 *               feedConsumed:
 *                 type: integer
 *               feedType:
 *                 type: string
 *               eggsProduced:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully recorded production
 *       400:
 *         description: Bad request
 */
router.post('/', productionController.recordProduction);

router.get('/track', productionController.trackProduction);
router.post('/record', productionController.recordProduction);
router.get('/weekly', productionController.getWeeklyProduction);
router.get('/monthly', productionController.getMonthlyProduction);

module.exports = router;
