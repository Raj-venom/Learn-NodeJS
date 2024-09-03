import prisma from "../../Db/db.config.js";


const registereUser = async (req, res) => {

    const { name, email, password } = req.body

    try {

        const registeredUser = await prisma.user.findUnique({
            where: { email }
        })

        if (registeredUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            },
            select: { id: true, name: true, email: true }

        })

        if (newUser) {
            return res.status(201).json({ data: newUser, message: "User created successfully" })
        }

        return res.status(500).json({ message: "Something went wrong while registering user" })


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }

}

const getUser = async (req, res) => {

    const { id } = req.params

    try {
        const userId = parseInt(id, 10);

        const user = await prisma.user.findUnique(
            {
                where: { id: userId },
                select: { id: true, name: true, email: true }
            }
        )

        if (!user) {
            return res.status(404).json({ message: `User with id ${userId} not found` })
        }

        return res.status(200).json({ data: user })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }

}

const updateUser = async (req, res) => {

    const { id } = req.params

    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" })
    }

    try {

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: req.body,
            select: { id: true, name: true, email: true }
        })

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` })
        }

        return res.status(200).json({ data: user, message: "User updated successfully" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }
}

const deleteUser = async (req, res) => {

    const { id } = req.params

    try {

        const user = await prisma.user.delete({
            where: { id: Number(id) }
        })

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` })
        }

        return res.status(200).json({ message: "User deleted successfully" })

    } catch (error) {
        if (error.code === 'P2025') {
            // This is the Prisma error code for "Record to delete does not exist."
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

const getAllUsers = async (req, res) => {

    try {
        const users = await prisma.user.findMany({

            select: {
                id: true,
                name: true,
                email: true,
                post: {
                    select: {
                        id: true,
                        title: true,
                        content: true
                    }
                },
                comment: {
                    select: {
                        id: true,
                        comment: true
                    }
                },
                _count: {
                    select: {
                        post: true,
                        comment: true
                    }
                }
            }

        })

        if (!users) {
            return res.status(404).json({ message: "No users found" })
        }

        return res.status(200).json({ data: users, message: "Users retrieved successfully" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })

    }

}

export {
    registereUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers

}