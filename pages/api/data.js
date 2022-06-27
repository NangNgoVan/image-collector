import connectToDB from '../../utils/connectToDB'
import formidable from "formidable"

import User from '../../models/User'

export const config = {
    api: {
       bodyParser: false,
    }
};

export default async function handler(req, res) {
    const form = new formidable.IncomingForm()
    try {
        form.parse(req, async (err, fields, files) => {
    
            if (err) {
                throw err;
            }

            console.log(fields,files)
    
            // create user
            await connectToDB();

            const { name, gender, email, ethnicity } = fields

            console.log(name,gender,email,ethnicity)
    
            const newUser = new User({
                name: name,
                gender: gender,
                email: email,
                ethnicity: ethnicity
            })
    
            newUser.save(function(err){
                if (err) res.status(500).json({ success: false, msg: 'Error'})
                res.status(200).json({ success: true, payload: newUser })
            })
        })
    }
    catch(err) {
        res.status(500).json({success:false, err: err})
    }
}