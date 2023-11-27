module.exports.getPosts = (req,res,next)=>{
    console.log("hey....");
    res.status(200).json({
        posts : [
            {
                _id : '1',
                title:"First Post",
                content:"This is the first Post !",
                imageUrl : "https://cataas.com/cat",
                creator : {
                    name : "Himanshu"
                },
                createdAt : new Date()
            }
        ]
    })
}

exports.createPost = (req,res,next)=>{
    console.log("Create post controller ...")
    const title = req.body.title;
    const content = req.body.content;
    // create post in db
    res.status(201).json({
        message : "SuccessFully Created !",
        post : {
            _id : new Date().toString(),
            title : title,
            content : content,
            creator : {
                name : "Anshu"
            },
            createdAt: new Date()
        }
    })
}