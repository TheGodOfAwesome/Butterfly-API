const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Post = require('./models/postModel')
const port = process.env.PORT || 4000;

app.use(express.json())

// routes

app.get('/', (req, res) => {
    res.send('Get API')
})

app.get('/posts', async(req, res) => {
    try { 
        const posts = await Post.find({})
        res.status(200).json(posts)
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.get('/posts/:id', async(req, res) => {
    try { 
        const {id} = req.params;
        const posts = await Post.findById(id);
        res.status(200).json(posts)
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.post('/posts', async(req, res) => {
    try { 
        const post = await Post.create(req.body)
        res.status(200).json(post)
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.put('/posts/:id', async(req, res) => {
    try { 
        const {id} = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body);

        if(!post) {
            return res.status(404).json({message: `cannot find post ${id}`});
        }
        
        const updatedPost = await Post.findById(id);
        res.status(200).json(updatedPost)
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.delete('/posts/:id', async(req, res) => {
    try { 
        const {id} = req.params;
        const post = await Post.findByIdAndDelete(id);

        if(!post) {
            return res.status(404).json({message: `cannot find post ${id}`});
        }
        res.status(200).json(post)
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

mongoose.set("strictQuery", false)
mongoose
.connect("mongodb+srv://admin:donvinton@cluster0.ilhibis.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    app.listen(port, () => {
        console.log('Running...')
    })
    console.log("Connected!");
})
.catch((error) => {
    console.log(error)
})