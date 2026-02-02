import mongoose from "mongoose";

interface IUrl {
  full: string;
  short: string;
  clicks: number;
}

const urlSchema = new mongoose.Schema<IUrl>({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  }
});

const Url = mongoose.model<IUrl>("Url", urlSchema);

export default Url;