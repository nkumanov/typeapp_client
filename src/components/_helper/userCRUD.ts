import axios from "axios";
import { api } from "../../constants/api";

export interface UserRegisterDTO {
  email: string;
  username: string;
  password: string;
}
export interface UserLoginDTO {
  email: string;
  password: string;
}
export const userRegister = async (data: UserRegisterDTO) => {
  const response = await axios.post(api.userRegister, data);
  return response;
};

export const userLogin = async (data: UserLoginDTO) => {
  const response = await axios.post(api.userLogin, data);
  return response;
};
