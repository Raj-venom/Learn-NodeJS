import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String,
        trim: true
    }
});

export const Permission = mongoose.model("Permission", permissionSchema);

