import axios from "axios";

export const baseURl = "http://192.168.1.64:3000/api/v1";

export default axios.create({
  baseURL: baseURl,
});
