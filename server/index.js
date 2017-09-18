const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

cloudinary.config({
  cloud_name: 'unicodeveloper',
  api_key: '663621638376484',
  api_secret: 'PiVKI2eiWENNIsVZx_A48UWdkYc'
});

// Multiparty middleware
const multipartMiddleware = multipart();

app.post('/upload', multipartMiddleware, function(req, res) {
  // Upload to Cloudinary
  cloudinary.v2.uploader.upload(req.files.image.path,
    // Specify Moderation
    {
      detection: "aws_rek_face"
    }, function(error, result) {
      console.log("Celebrity name", result.info.detection.aws_rek_face.data.celebrity_faces[0].name);
      res.json(result);
    });
});

app.get('/test', (req, res) => {
  res.json("Another,I got jokes");
});


app.listen(3333);
console.log('Listening on localhost:3333');