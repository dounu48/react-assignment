import express from 'express';
import Preference from '../models/preference';
import mongoose from 'mongoose';

const router = express.Router();

// Write preference
router.post('/', (req, res) => {

//        if(typeof req.session.loginInfo === 'undefined') {
//            return res.status(403).json({
//                error: "NOT LOGGED IN",
//                code: 2
//            });
//        }

        let preference = new Preference({
            username: req.session.loginInfo.username,
            language: req.body.preferences.language,
            timezone: req.body.preferences.timezone,
            currency : req.body.preferences.currency,
            privacy: req.body.preferences.privacy,
            messages : req.body.preferences.messages,
            content: req.body.preferences.content,
            recentlyVisited: {}

        });

        preference.save( err => {
            if(err) throw err;
            return res.json({ success: true });
        });
});


// Get preference info
router.get('/:username', (req, res) => {
//    if(typeof req.session.loginInfo === 'undefined') {
//                return res.status(403).json({
//                    error: "NOT LOGGED IN",
//                    code: 2
//                });
//            }

    if ( req.params.username === undefined) {
          return res.status(403).json({
            error: "Username is not valid",
            code : 2
          });
    }

    Preference.findOne({ username : req.params.username })
        .exec((err, preference) => {
            if(err) throw err;
            res.json(preference);
        });

});


// Modify preference
router.put('/:id', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEMO
    Preference.findById(req.params.id, (err, preference) => {
        if(err) throw err;

        // IF MEMO DOES NOT EXIST
        if(!preference) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if(preference.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        // MODIFY AND SAVE IN DATABASE
        preference.contents = req.body.contents;
        preference.date.edited = new Date();
        preference.is_edited = true;

        preference.save((err, preference) => {
            if(err) throw err;
            return res.json({
                success: true,
                preference
            });
        });

    });
});

// Delete preference
router.delete('/:username', (req, res) => {
    console.log("=== here");

        // CHECK LOGIN STATUS
        if(typeof req.session.loginInfo === 'undefined') {
            return res.status(403).json({
                error: "NOT LOGGED IN",
                code: 2
            });
        }


            // REMOVE THE MEMO
            Preference.remove({ username: req.params.username }, err => {
                if(err) throw err;
                res.json({ success: true });
            });

});

export default router;