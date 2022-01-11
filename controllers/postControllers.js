const Post = require('../models/Post')

exports.getAllPosts = async (req, res, next)=>{
    //res.send("Get all posts route")

    try {
        //const posts = await Post.findAll()   // it returns rawData and fieldData
        const [rawData,_] = await Post.findAll()
        //res.status(200).json({rawData})   // convert to JSON
        res.status(200).json({count:rawData.length, rawData})
    } catch (error) {
        console.log(error);
        next(error); // return it to our global handler
    }

}

exports.createNewPost = async (req, res, next)=>{

    try {
        //const post = new Post("title of the first Post title","Body of the first post")
        let { title, body } = req.body   // res.body >>> we can get the value is because we set app.use(express.json()); in server.js
        const post = new Post(title, body)
    
        post = await post.save();  // await >>> because .save() is async and return promise
        //console.log(post);
        res.status(2001).json({message:"post created"})
        
    } catch (error) {
        console.log(error);
        next(error); // return it to our global handler
    }

}

exports.getPostById = async (req, res, next)=>{
    //res.send("Get post by ID route")
    try {
        let postId = req.params.id;
        //let post = await Post.findById( postId)
        //let [rawData, filedData] = await Post.findById( postId)
        let [rawData, _] = await Post.findById(postId)
        //res.status(200).json({rawData}) // get a format of array {"rawData":[{"id":1,"title":"Post One","body":"This is the body of post one","created_at":"2022-01-10"}]}
        res.status(200).json({post:rawData[0]})  // {post:{"id":1,"title":"Post One","body":"This is the body of post one","created_at":"2022-01-10"}]}
    } catch (error) {
        console.log(error);
        next(error); // return it to our global handler
    }
}
