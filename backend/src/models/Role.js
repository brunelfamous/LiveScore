import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['super-admin', 'gestionnaire', 'user'],
    lowercase: true
  },
  description: { type: String }
});

export default mongoose.model('Role', roleSchema);