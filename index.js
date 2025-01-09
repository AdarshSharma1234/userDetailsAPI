const express = require('express')
const mongoose = require ('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const router = require('./routes/userRoutes')
const UserDetails = require('./models/userDetails')


const app = express()

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/userDetailsDB')

app.use(bodyParser.json())
app.use('/api',userRoutes)

app.listen(port,()=>{
    console.log(`server runing port ${port}`);
    
})


// new data insert in database udinf a post mathord


router.post('/users',async(res,req)=>{
    try {
        const user = new UserDetails(req.body);
         await user.save()
         res.status(201).send(user)  
    } catch (error) {
        res.status(400).send(error);
        
    }
})