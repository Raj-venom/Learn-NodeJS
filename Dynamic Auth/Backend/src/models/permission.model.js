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
    method: {
        type: String,
        required: true,
        enum: ["GET", "POST", "PATCH", "DELETE", "PUT"], 
        trim: true
    }
});

export const Permission = mongoose.model("Permission", permissionSchema);
