const express = require("express");
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer");
require("dotenv").config()
const app = express();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILID,
        pass: process.env.MAILPASS
    }
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/", (req, res) => {
    transporter.sendMail({
        from: "TravelFika<" + process.env.MAILID + ">",
        to: req.body.to,
        subject: "Testing nodemailer",
        html: "<p>Hello</p>",
        attachments: [
            {
                filename: "sample.jpg",
                path: "https://www.sony.net/Products/di_photo-gallery/images/extralarge/1887.JPG"
            }
        ]
    }, (err, info) => {
        if (err) throw err;
        res.send({
            // status: info.response,
            message:"Mail sent"
        })
    })
})

app.listen(8080, () => {
    console.log("Connected to port 8080");
})