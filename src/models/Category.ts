import mongoose, { Document, Schema } from "mongoose";

export interface ICategory {
  name: string;
  description: string;
}

export interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ICategoryModel>("categories", CategorySchema);
