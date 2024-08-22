import axios from "axios";

export const baseURl = "http://192.168.1.77:3022/";

export default axios.create({
  baseURL: baseURl,
});
