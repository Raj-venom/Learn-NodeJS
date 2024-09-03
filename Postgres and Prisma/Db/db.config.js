import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn']
    // log: ['query']

})

export default prisma