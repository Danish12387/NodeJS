import express from 'express';
import Ads from '../models/Ads.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    const ads = await Ads.find();
    res.send({ message: 'Ads fetched successfully', data: ads })
})

router.post('/post', async (req, res) => {
    try {
        const ad = new Ads(req.body)
        await ad.save()
        res.send({ message: 'Ad posted successfully' })
    }
    catch (e) {
        res.send({ message: e.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedAd = Ads.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        ).lean()

        if (!updatedAd) {
            req.status(404).send({ message: 'Ad not found!' });
        }

        res.send({ message: 'Ad updated successfully', updatedAd: updatedAd })
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAd = await Ads.findOneAndDelete(
            { _id: id }
        );

        if (!deletedAd) {
            return res.status(404).send({ message: 'Ad not found!' });
        }

        res.send({ message: "Ad deleted successfully", deletedAd });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

export default router;
