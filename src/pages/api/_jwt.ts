import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const secretKey = process.env.SECRETKEY as unknown as string;

export const login = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
export const signup = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export const todoStructure = z.object({
  title: z.string(),
  description: z.string(),
});

export function generateJwt(email: string) {
  try {
    if (secretKey && email) {
      const token = jwt.sign(email, secretKey);
      return token;
    } else {
      throw new Error("No secret key found or invalid login details");
    }
  } catch (error: any) {
    return { error: error.message };
  }
}

export default function authentication(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: () => void
) {
  try {
    let token = req.headers.token as unknown as string;
    if (token) {
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          throw new Error(err.message);
        }
        if (!user || user == undefined) {
          console.log(`JWT verification failed`);
          throw new Error(`JWT Authentication failed`);
        }
        console.log(`Token is valid. welcome ${user}`);
        req.headers.email = user as unknown as string;
        console.log(req.headers.email);
        callback();
      });
    }
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
