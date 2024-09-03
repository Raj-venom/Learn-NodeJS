import prisma from "../../Db/db.config.js";


const createComment = async (req, res) => {

    const { userId, postId, comment } = req.body

    if (!userId || !postId || !comment) {
        return res.status(400).json({ message: "userId, postId and comment are required" })
    }

    try {

        const newComment = await prisma.comment.create({
            data: {
                userId: Number(userId),
                postId: Number(postId),
                comment
            }
        })

        if (!newComment) {
            return res.status(500).json({ message: "Something went wrong while creating Comment" })
        }

        await prisma.post.update({
            where: { id: Number(postId) },
            data: {
                comment_count: {
                    increment: 1
                }
            }
        })

        return res.status(201).json({ data: newComment, message: "Comment created successfully" })

    } catch (error) {

        if (error.code === 'P2003') {
            // Foreign key constraint failed (e.g., userId does not exist)
            return res.status(400).json({ message: "Invalid userId. User does not exist." });
        }

        console.error(error);
        return res.status(500).json({ message: "Internal server error" });

    }

}

const getComment = async (req, res) => {

    const { id } = req.params

    try {

        const post = await prisma.comment.findFirst({
            where: { id },
            select: {
                id: true,
                comment: true,
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        title: true,
                        user: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })

        if (!post) {
            return res.status(404).json({ message: `Post with id ${id} not found` })
        }

        return res.status(200).json({ data: post })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }

}


const deleteComment = async (req, res) => {

    const { id } = req.params

    try {

        const post = await prisma.comment.delete({
            where: { id }
        })

        if (!post) {
            return res.status(404).json({ message: `Post with id ${id} not found` })
        }

        await prisma.post.update({
            where: { id: Number(post.postId) },
            data: {
                comment_count: {
                    decrement: 1
                }
            }
        })

        return res.status(200).json({ message: "Comment deleted successfully" })

    } catch (error) {
        if (error.code === 'P2025') {
            // This is the Prisma error code for "Record to delete does not exist."
            return res.status(404).json({ message: `Comment with id ${id} not found` });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

const getAllComment = async (req, res) => {

    try {

        const comment = await prisma.comment.findMany({
            select:{
                id:true,
                comment:true,
                user:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                post:{
                    select:{
                        id:true,
                        title:true,
                        user:{
                            select:{
                                id:true,
                                name:true
                            }
                        }
                    }
                }
                
            }
        })

        if (comment.length > 0) {
            return res.status(200).json({ data: comment })
        }

        return res.status(404).json({ message: "No comment found" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }

}


export {
    createComment,
    getComment,
    deleteComment,
    getAllComment
}