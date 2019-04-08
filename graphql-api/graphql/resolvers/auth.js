//Import Model
const User = require('../../models/user');
//Import Helpers
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: async args => {
    //prevent the creation of mulitple users with same e-mail
        try {
        const existingUser = await User.findOne({name: args.userInput.name})
            if (existingUser) {
                throw new Error ('Username already exists.')
            }
            //using becrypt to create hashed password
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            
            const newUser = new User({
                name: args.userInput.name,
                password: hashedPassword,
                profilePic: args.userInput.profilePic
            });
            const result = await newUser.save();    
                //setting password to null so that it can't be retrieved.
                return {...result._doc, password:null, _id: result.id}
        }
        catch(err){
                throw err
        }
    },
    login: async ({name, password}) =>{
        const user = await User.findOne( {name: name});
        if (!user) {
            throw new Error('User does not exist!')
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect')
        }
        const token = jwt.sign({userId: user.id, name:user.name},'somesupersecretkey', {expiresIn: '1h'});
        return { userId: user.id, token: token, tokenExpiration: 1}
    }
}