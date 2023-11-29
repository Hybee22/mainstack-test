import mongoose, { Document, Schema } from "mongoose";

export interface IReview {
  description: string;
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
}

export interface IReviewModel extends IReview, Document {}

const ReviewSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IReviewModel>("reviews", ReviewSchema);
