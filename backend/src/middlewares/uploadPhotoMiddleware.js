import multer from "multer";
import { join, extname } from "path";
import fileDirName from "../libs/file-dirname.js";
import { unlink } from "fs/promises";
import { Users } from "../Models/Users.js";

const { __dirname } = fileDirName(import.meta);

const diskStorage = multer.diskStorage({
  destination: join(__dirname, "../../userPhotos"),
  filename: (req, file, callback) => {
    const photoName = `${
      Date.now() + "-" + Math.round(Math.random() * 1e9)
    }${extname(file.originalname)}`;
    callback(null, photoName);
  },
});

const diskStorageToUpdatePhoto = multer.diskStorage({
  destination: join(__dirname, "../../userPhotos"),
  filename: async (req, file, callback) => {
    const { photo: photoToDelete } = await Users.findOne({
      attributes: ["photo"],
      where: { userId: req.params.userId },
    });
    const newPhoto = `${
      Date.now() + "-" + Math.round(Math.random() * 1e9)
    }${extname(file.originalname)}`;

    if (!photoToDelete) {
      callback(null, newPhoto);
      const updatePhotoUser = await Users.update(
        { photo: newPhoto },
        { where: { userId: req.params.userId } }
      );
      return;
    }

    unlink(join(__dirname, `../../userPhotos/${photoToDelete}`));
    const updatePhotoUser = await Users.update(
      { photo: newPhoto },
      { where: { userId: req.params.userId } }
    );
    callback(null, newPhoto);
  },
});

const upload = multer({ storage: diskStorage }).single("photo");

const uploadUpdatePhoto = multer({ storage: diskStorageToUpdatePhoto }).single(
  "photo"
);

export { upload, uploadUpdatePhoto };
