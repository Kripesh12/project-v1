import axios from "axios";

export const baseURl = "http://16.171.174.76:3022/";

export default axios.create({
  baseURL: baseURl,
});
