const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.post('/top5list', auth.verify, Top5ListController.createTop5List)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.put('/top5list/publish/:id', auth.verify, Top5ListController.publishTop5List)
router.put('/top5list/like/:username/:id', auth.verify, Top5ListController.likeTop5List)
router.put('/top5list/dislike/:username/:id', auth.verify, Top5ListController.dislikeTop5List)
router.put('/top5list/view/:id', auth.verify, Top5ListController.viewTop5List)
router.put('/top5list/comment/:username/:id', auth.verify, Top5ListController.commentTop5List)
router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('/top5list/:id', Top5ListController.getTop5ListById)
router.get('/top5lists', Top5ListController.getTop5Lists)
router.get('/top5listspublished', Top5ListController.getPublishedTop5Lists)
router.get('/top5listpairs', Top5ListController.getTop5ListPairs)
router.get('/top5listquery/:query/:flag/:username', Top5ListController.getListByString)
router.get('/top5listpairs/:username', Top5ListController.getTop5ListPairsByUsername)
router.get('/top5list/:username/:name', Top5ListController.getPublishedTop5ListByUsername)
router.get('/top5lists/:username', Top5ListController.getPublishedTop5ListsByUsername)

router.get('/communitylists/', Top5ListController.getCommunityLists)
router.put('/communitylist/view/:id', auth.verify, Top5ListController.viewCommunityList)
router.put('/communitylist/dislike/:username/:id', auth.verify, Top5ListController.dislikeCommunityList)
router.put('/communitylist/like/:username/:id', auth.verify, Top5ListController.likeCommunityList)
router.put('/communitylist/comment/:username/:id', auth.verify, Top5ListController.commentCommunityList)
router.get('/communitylist/:query', auth.verify, Top5ListController.getCommunityListByString)







router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
router.get('/loggedIn', UserController.getLoggedIn)
module.exports = router