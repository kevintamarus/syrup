const router = require('express').Router();
const controller = require('../controller/controller');
const griffController = require('../controller/griffController');

//Connect with match
router.post('/match/:id/:subject_id', controller.connectMatch);
// //Getting all Matches
router.get('/matches/:userId', controller.getMatches);
// //Add personal info 
router.post('/profile', controller.addProfile);
// //Storing messages in DB
router.post('/message/:userId/:recipientId', controller.saveMessages);
router.get('/message/:userId/:recipientId', controller.getMessages);
router.get('/users/:firstname', controller.getUserId)
// get individual profile
router.get('/profile/:id', controller.getProfile);
router.get('/profile/get/:id', controller.renderClickedProfile);
router.get('/matches/percent/:subject_id', griffController.getMatchesByPercent);
// verify match
router.get('/match/:id/:subject_id', controller.verifyMatch);
//upload photo
router.post('/photos', controller.uploadUserPhotos);
router.put('/updateProfile/:id', controller.updateProfile);
router.get('/message/:userId', controller.retrieveFirstName);


module.exports = router;