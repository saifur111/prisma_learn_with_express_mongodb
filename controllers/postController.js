const prisma = require("../prisma/index");
// create a new post 
exports.createPost = async (req,res,next)=>{
    try {
      const {slug,title,body,authorId} = req.body;
      // validation here 
      const result =  await prisma.post.create({
        data:{
            slug,
            title,
            body,
            author:{
                connect:{
                    id:authorId
                }
            }
        }
      })
      res.json(result)
    } catch (error) {
        res.json({ error: `Failed to create post..` });
    }
}

// update post
exports.updatePost = async (req,res,next)=>{
    try {
      const {postId} = req.params;
      const {title,body}= req.body;
      // validation here 
      const result =  await prisma.post.update({
        where:{
            id:postId,
        },
        data:{
            title,
            body,
        }
      })
      res.json(result)
    } catch (error) {
        res.json({error: `Post with ${postId} does not exist...`})
    }
}
exports.deletePost = async (req,res,next)=>{
    try {
      const { postId } = req.params;//extract from url
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      res.json(result)
    } catch (error) {
        res.json({ error: `Delete Id does not exist...` });
    }
}
exports.getPosts = async (req,res,next)=>{
    try {
      const posts =  await prisma.post.findMany();
      res.json(posts);
    } catch (error) {
        res.json({error: `No post found..`})
    }
}