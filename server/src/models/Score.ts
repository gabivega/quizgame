import mongoose, {Schema, Document} from 'mongoose';

export interface IScore extends Document {
    name: string;
    score: number;
    category: string
    createdAt : Date;
}

const scoreSchema: Schema = new Schema (
    {
        name : {type: String, required: true},
        score: {type: Number, required: true},
        category: {type: String, required: true},
    },
    {
        timestamps: {createdAt: true, updatedAt: false},
    }
);

export default mongoose.model<IScore>('score', scoreSchema);