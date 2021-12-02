const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.post('/top5list', auth.verify, Top5ListController.createTop5List)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.put('/top5list/publish/:id', auth.verify, Top5ListController.publishTop5List)
router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('/top5list/:id', auth.verify, Top5ListController.getTop5ListById)
router.get('/top5lists', auth.verify, Top5ListController.getTop5Lists)
router.get('/top5listpairs', auth.verify, Top5ListController.getTop5ListPairs)
router.get('/top5listpairs/:username', auth.verify, Top5ListController.getTop5ListPairsByUsername)
router.get('/top5list/:username/:name', auth.verify, getPublishedTop5ListsByUsername)


router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
router.get('/loggedIn', UserController.getLoggedIn)
module.exports = router