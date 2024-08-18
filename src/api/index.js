import axios from "axios";

export const baseURl = "http://192.168.1.68:3022";

export default axios.create({
  baseURL: baseURl,
});
