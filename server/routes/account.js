import express from 'express';
import Account from '../models/account';


const router = express.Router();

router.post('/logout', (req, res) => {
    return res.json({ success: true });
});

router.post('/register', function(req, res){
    var account = new Account();
    account.username = "test";
    account.password = "test";
    account.created = new Date("2017-08-28");

    account.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
});

router.get('/getuser', (req, res) => {
    Account.find().exec((err, accounts) => {
        if(err) throw err;
        res.json(accounts);
    })
});

router.get('/getinfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
            return res.status(401).json({
                error: 1
            });
        }

        res.json({ info: req.session.loginInfo });
});


router.post('/signin', (req, res) => {

    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "PASSSWORD IS NOT STRING",
            code: 1
        });
    }

    Account.findOne({ username: req.body.username, password: req.body.password }, (err, account) => {

        if(err) throw err;
        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }
        let session = req.session;
        session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        return res.json({
            success: true
        });
    });
});


export default router;