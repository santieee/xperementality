import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';




@Injectable()
export class S3Service {
  public AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
  public s3 = new AWS.S3();

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async photoUpload(@Req() req, @Res() res, fieldName, cb) {
    await this.upload.array(fieldName, 1)(req, res, async error => {
      return res.status(201).json(await cb(req.files[0].location));
    })
  }

  upload = multer({
    storage: multerS3({
      s3: this.s3,
      bucket: this.AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function(request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  })
} 