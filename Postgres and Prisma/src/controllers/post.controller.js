import prisma from "../../Db/db.config.js";


const createPost = async (req, res) => {

    const { userId, title, content } = req.body

    if (!userId || !title || !content) {
        return res.status(400).json({ message: "userId, title and content are required" })
    }

    try {

        const newPost = await prisma.post.create({
            data: {
                userId: Number(userId),
                title,
                content,
            }
        })

        if (newPost) {
            return res.status(201).json({ data: newPost, message: "Post created successfully" })
        }

        return res.status(500).json({ message: "Something went wrong while creating Post" })


    } catch (error) {
        if (error.code === 'P2003') {
            // Foreign key constraint failed (e.g., userId does not exist)
            return res.status(400).json({ message: "Invalid userId. User does not exist." });
        }

        console.error(error);
        return res.status(500).json({ message: "Internal server error" });

    }

}

const getPost = async (req, res) => {

    const { id } = req.params

    try {

        const post = await prisma.post.findUnique(
            {
                where: { id: Number(id) }
            }
        )

        if (!post) {
            return res.status(404).json({ message: `Post with id ${id} not found` })
        }

        return res.status(200).json({ data: post })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }

}

const updatePost = async (req, res) => {

    const { id } = req.params

    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).json({ message: "title and content are required" })
    }

    try {

        const post = await prisma.post.findUnique({
            where: { id: Number(id) }
        })

        if (!post) {
            return res.status(404).json({ message: `Post with id ${id} not found` })
        }

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, content }
        })

        if (updatedPost) {
            return res.status(200).json({ data: updatedPost, message: "Post updated successfully" })
        }

        return res.status(500).json({ message: "Something went wrong while updating Post" })


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }
}

const deletePost = async (req, res) => {

    const { id } = req.params

    try {

        const post = await prisma.post.delete({
            where: { id: Number(id) }
        })

        if (!post) {
            return res.status(404).json({ message: `Post with id ${id} not found` })
        }

        return res.status(200).json({ message: "Post deleted successfully" })

    } catch (error) {
        if (error.code === 'P2025') {
            // This is the Prisma error code for "Record to delete does not exist."
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

const getAllPost = async (req, res) => {

    try {

        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                comments: {
                    select: {
                        id: true,
                        comment: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                comment_count: true
            },

            // filter
            orderBy: { createdAt: 'asc' },
            where: {
                userId: { 
                   gt:1
                }
                // title:{
                //     endsWith: "good"
                // }
            }

        })

        if (posts.length > 0) {
            return res.status(200).json({ data: posts, message: "All posts fetched sucessfully" })
        }

        return res.status(404).json({ message: "No posts found" })


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }

}

const getPostByUser = async (req, res) => {

    const { userId } = req.params

    try {
        const posts = await prisma.post.findMany({
            where: { userId: Number(userId) }
        })

        if (posts.length > 0) {
            return res.status(200).json({ data: posts })
        }

        return res.status(404).json({ message: `No posts found for user with id ${userId}` })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }

}

const searchPost = async (req, res) => {

    const {title} = req.query
    try {

        const posts = await prisma.post.findMany({
            where:{
                title:{
                    search: title,
                    // mode: 'insensitive'
                }
            }
        })

        if (posts.length > 0) {
            return res.status(200).json({ data: posts })
        }

        return res.status(404).json({ message: `No posts found with title ${title}` })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}



export {
    createPost,
    getPost,
    updatePost,
    deletePost,
    getAllPost,
    getPostByUser,
    searchPost

}