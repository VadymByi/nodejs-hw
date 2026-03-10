import { Schema } from 'mongoose';
import { model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, min: 8 },
  },
  { timestamps: true },
);

// userSchema.index({username: 'text', email: 'text'});

export const User = model('User', userSchema);
