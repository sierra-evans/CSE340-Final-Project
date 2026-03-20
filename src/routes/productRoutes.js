import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('products/list');
});

export default router;