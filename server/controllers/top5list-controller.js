const Top5List = require('../models/top5list-model');
const User = require('../models/user-model');
const CommunityList = require('../models/communitytop5list-model');
const { createCollection } = require('../models/top5list-model');


createTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const top5List = new Top5List(body);
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }
    User.findOne({ username: req.body.ownerUsername }, (err, user) => {
        user.lists.push(top5List._id);
        user.save()
    })

    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}

updateTop5List = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

deleteTop5List = async (req, res) => {
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}
getTop5ListPairs = async (req, res) => {
    await Top5List.find({ }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let pair = {
                    _id: list._id,
                    name: list.name,
                    ownerUsername: list.ownerUsername,
                    likedBy: list.likedBy,
                    dislikedBy: list.dislikedBy,    
                    isPublished: list.isPublished,
                    publishedDate: list.publishedDate,
                    views: list.views,
                    items: list.items,
                    comments: list.comments,
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

publishTop5List = async (req, res) => {
    await Top5List.findById( { _id: req.params.id }, async (err, top5List) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5List) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 List not found` })
        }
        top5List.isPublished = true;
        top5List.publishedDate = Date.now();
        top5List.views = 0;

        console.log("FINDING A COMMUNITY LIST WITH THE SAME NAME AS THE TOP 5 LIST");

        checkCommunityList(top5List);

        top5List
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List published!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Top 5 List not published!',
                })
            })
    })
}

checkCommunityList = async (top5List) => {
    await CommunityList.findOne({ name: {$regex : new RegExp(top5List.name, "i")} }, (err, communityList) => {
        if (err) {
        }
        if (!communityList) {
            console.log("CREATING COMMUNITY LIST");
            createCommunityList(top5List);
        }
        else {
            console.log("UPDATING COMMUNITY LIST");
            // updateCommunityList(top5List, communityList);    
        }
    }).catch(err => console.log(err))
}

createCommunityList = async (top5List) => {
    let listItem = top5List.items.map((item,index) => {
        return {
            itemName: item,
            votes: 5-index,
        }
    });

    let communityList = new CommunityList({
        name: top5List.name,
        items: listItem,
    });
    console.log("----------------------------------");
    console.log("communityList: " + JSON.stringify(communityList));
    communityList
        .save()
        .then(() => {
            console.log("SUCCESS!!!");
        })
        .catch(error => {
            console.log("FAILURE: " + JSON.stringify(error));
        })
}

// GET PUBLISHED TOP 5 LISTS BY USERNAME WITH A NAME (CASE INSENSITIVE)
getPublishedTop5ListByUsername = async (req, res) => {
    await Top5List.find({ ownerUsername: req.params.username, isPublished: true, name: {$regex : new RegExp(req.params.name, "i")}},
     (err, top5Lists) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res.status(200).json({ success: true, data: [], error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}

getPublishedTop5ListsByUsername = async (req, res) => {
    await Top5List.find({ ownerUsername: req.params.username, isPublished: true},
     (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res.status(404).json({ success: false, data: [], error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}

// GET ALL LISTS BY USERNAME STARTING WITH A GIVEN STRING (CASE INSENSITIVE)
getListByString = async (req, res) => {
    let query = '^' + req.params.query; 
    if (req.params.flag === "0") {
        await Top5List.find({isPublished: true, name: {$regex : new RegExp(query, "i")}}, 
        (err, top5Lists) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!top5Lists.length) {
                    return res.status(404).json({ success: false, data: [], error: `Top 5 Lists not found` })
                }
                return res.status(200).json({ success: true, data: top5Lists })
            }).catch(err => console.log(err));
    }
    else {  
        await Top5List.find({ownerUsername: req.params.username, name: {$regex : new RegExp(query, "i")}}, 
        (err, top5Lists) => {
            console.log(top5Lists);
                if (err) {
                    
                    return res.status(400).json({ success: false, error: err })
                }
                if (!top5Lists.length) {
                    return res.status(404).json({ success: false, data: [], error: `Top 5 Lists not found` })
                }
                return res.status(200).json({ success: true, data: top5Lists })
            }).catch(err => console.log(err));
    }
}

// GET ALL PUBLISHED TOP 5 LISTS 
getPublishedTop5Lists = async (req, res) => {
    await Top5List.find({ isPublished: true }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res.status(200).json({ success: true, data: [], error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}


// LIKE A TOP 5 LIST
likeTop5List = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5List) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 List not found` })
        }
        if (top5List.likedBy.includes(req.params.username)) {
            return res
                .status(400)
                .json({ success: false, error: `Top 5 List already liked` })
        }
          
        if (top5List.dislikedBy.includes(req.params.username)) {
            top5List.dislikedBy.pull(req.params.username);
            top5List.likedBy.push(req.params.username);
            top5List.save().then(() => {
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List liked!',
                })
            })
        }
        else {
            top5List.likedBy.push(req.params.username);
            top5List.save().then(() => {
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List liked!',
                })
            })
        }
    })
}

// DISLIKE A TOP 5 LIST
dislikeTop5List = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5List) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 List not found` })
        }
        if (top5List.dislikedBy.includes(req.params.username)) {
            return res
                .status(400)
                .json({ success: false, error: `Top 5 List already disliked` }) 
        }
        if (top5List.likedBy.includes(req.params.username)) {
            top5List.likedBy.pull(req.params.username);
            top5List.dislikedBy.push(req.params.username);
            top5List.save().then(() => {
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List disliked!',
                })
            })
        }
        else {
            top5List.dislikedBy.push(req.params.username);
            top5List.save().then(() => {
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List disliked!',
                })
            })
        }
    })
}

viewTop5List = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5List) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 List not found` })
        }
        top5List.views += 1;
        top5List.save().then(() => {
            return res.status(200).json({
                success: true,
                id: top5List._id,
                message: 'Top 5 List viewed!',
            })
        })
    })
}

commentTop5List = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5List) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 List not found` })
        }
        const comment = {
            username: req.params.username,
            comment: req.body.comment,
        }
        top5List.comments.push(comment);
        top5List.save().then(() => {
            return res.status(200).json({
                success: true,
                id: top5List._id,
                message: 'Top 5 List commented!',
            })
        })
    })
}

// GET ALL LIST PAIRS FROM A USERNAME
getTop5ListPairsByUsername = async (req, res) => {
    await Top5List.find({ ownerUsername: req.params.username }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        // PUT ALL THE LISTS INTO ID, NAME PAIRS
        let pairs = [];
        for (let key in top5Lists) {
            let list = top5Lists[key];
            let pair = {
                _id: list._id,
                name: list.name,
                ownerUsername: list.ownerUsername,
                likedBy: list.likedBy,
                dislikedBy: list.dislikedBy,
                isPublished: list.isPublished,
                views: list.views,
                items: list.items,
                publishedDate: list.publishedDate,
                comments: list.comments,
            };  
            pairs.push(pair);
        }
        return res.status(200).json({ success: true, idNamePairs: pairs })
    }).catch(err => console.log(err))
}




module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5Lists,
    getTop5ListPairs,
    getPublishedTop5ListByUsername,
    getPublishedTop5ListsByUsername,
    likeTop5List,
    getListByString,
    dislikeTop5List,
    viewTop5List,
    commentTop5List,
    getPublishedTop5Lists,
    getTop5ListPairsByUsername,   
    publishTop5List,
    getTop5ListById
}