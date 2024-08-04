import axios from "axios";

export const baseURl = "http://192.168.1.64:3022";

export default axios.create({
  baseURL: baseURl,
});
