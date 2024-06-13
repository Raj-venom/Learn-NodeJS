import { z } from "zod"


const permissionSchema = z.object({
    permissions: z.array(z.string())
})

export {
    permissionSchema
}