const express = require('express');
const router = new express.Router();
const conn = require('../DB/connection');
const multer = require('multer');
const moment = require('moment');


//Image storage config

let imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})

//Img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(null, Error('Only image is allow!!!'))

    }
}

let upload = multer({
    storage: imgConfig,
    fileFilter: isImage,
})

//Registor User data
router.post('/register', upload.single("photo"), (req, res) => {
    const { fName } = req.body;
    const { filename } = req.file;
    if (!fName || !filename) {
        res.status(422).json({ status: 422, message: 'Fill all the details' })
    }
    try {
        let date = moment(new Date()).format('YYYY-MM_DD HH:MM:SS');
        conn.query("INSERT INTO `movie_review` SET ?", {
            name: fName,
            moviewReview: date,
            image: filename,
            date: date
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Added');
                res.status(201).json({ status: 201, data: req.body })

            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})

// Get User data
router.get("/getData", (req, res) => {
    try {
        conn.query("SELECT * FROM `movie_review`", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Selected');
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})

//Delete uyser
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    try {
        conn.query(`DELETE FROM movie_review WHERE id='${id}'`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Deleted');
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})
module.exports = router;