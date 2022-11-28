const mongoose=require('mongoose');
const validator=require('validator')

const Schema=mongoose.Schema;
const registerSchema = new Schema({
    full_name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile_number: {
        type: String,
        required: true,
    },
    address:{
        type:String,
        required:true,
    },
    id_type:{
        type:String,
        required:true,
    },
    id_number:{
        type:String,
        required:true,
    },
    plan:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
})

//register logic


registerSchema.statics.register = async function (full_name,email,mobile_number,address,id_type,id_number,plan,date){
    try {
        // validation
        if(!full_name||!email||!mobile_number||!address||!id_type||!id_number||!plan||!date) {
            throw new Error('All fields must be filled')
        }
        // validate email
        if (!validator.isEmail(email)) {
            throw new Error('Email is invalid')
        }
        const newRegister = await this.create({full_name,email,mobile_number,address,id_type,id_number,plan,date})
        return newRegister
    } catch (err) {
        throw err
    }
}
module.exports = mongoose.model('Register', registerSchema);