import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'categories' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IProductModel>("products", ProductSchema);
