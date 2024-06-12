import axios from "axios";

const client = process.env.NEXT_PUBLIC_CLIENT_HOST || "http://127.0.0.1:3000";
export const signUpUser = async (signUpInfo: any): Promise<any> => {
  try {
    const data = await axios.post(`${client}/v1/auth/sign-up`, signUpInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
