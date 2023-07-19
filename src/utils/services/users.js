import { BASE_URL } from "../helper";
import logger from "../logger";
import Interceptor from "./interceptor";

const request = new Interceptor();

export const loginUser = async (data, success, error) => {
  try {
    const response = await request.post(`${BASE_URL}/auth/login`, data);
    success(response?.data);
  } catch (err) {
    error(err);
    logger(err);
  }
};