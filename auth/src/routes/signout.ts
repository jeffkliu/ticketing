import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.status(200).send('You are signed out.');
});

export { router as signOutRouter };
