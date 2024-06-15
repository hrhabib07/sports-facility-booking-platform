import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config";
import { TUser } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";

export const getUserId = async (tokenWithBearer: string) => {
  // const tokenWithBearer = req.headers.authorization;
  const accessToken = tokenWithBearer?.split(" ")[1];
  const decodedToken: JwtPayload = jwt.verify(
    accessToken as string,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { email } = decodedToken;
  const verifiedUser: TUser | null = await User.findOne({ email });

  const userId = verifiedUser?._id;
  return userId;
};
