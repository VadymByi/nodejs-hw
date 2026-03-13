import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCoudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCoudinary(req.file.buffer, req.user._id);

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true },
  );
  res.status(200).json({ url: updatedUser.avatar });
};

// export const updateUserAvatar = async (req, res) => {
//   if (!req.file) {
//     throw createHttpError(400, 'No file');
//   }

//   try {
//     const result = await saveFileToCoudinary(req.file.buffer, req.user._id);

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       { avatar: result.secure_url },
//       { new: true },
//     );

//     res.status(200).json({ url: updatedUser.avatar });
//   } catch (error) {
//         throw createHttpError(500, 'Failed to upload avatar to cloud');
//   }
// };
