import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    fullName: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    //encryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
    next();
});

userSchema.methods.comparePassword = function(password) {
    const user = this;

    return bcrypt.compareSync(password, user.password);
}

const Users = mongoose.model('users', userSchema);

export default Users;