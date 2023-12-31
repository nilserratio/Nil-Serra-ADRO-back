import mongoose from "mongoose";

const connectToDatabase = async (mongoDbConnection: string) => {
  mongoose.set("debug", false);
  mongoose.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      delete ret._id;
    },
  });

  await mongoose.connect(mongoDbConnection);
};

export default connectToDatabase;
