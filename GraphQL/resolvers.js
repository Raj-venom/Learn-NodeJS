import { nanoid } from "nanoid"

class Course {
    constructor(id, {
        courseName, category, price, stack, teachingAssists

    }) {
        this.id = id
        this.courseName = courseName
        this.category = category
        this.price = price
        this.stack = stack
        this.teachingAssists = teachingAssists
    }
}

const courseholder = {}
console.log("\n\n\nnew:",courseholder);

const resolvers = {

    getCourse: ({ id }) => {
        return new Course(id, courseholder[id])
    },

    createCourse: ({input}) => {
        const id = nanoid()
        courseholder[id] = input
        return new Course(id, input)
    },

}

export default resolvers