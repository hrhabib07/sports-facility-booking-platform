import bcrypt from "bcrypt";
import { catchAsync } from "../../utils/catchAsync";

export const isPasswordMatch = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
};

export const verifyAdmin = catchAsync(async (req) => {
  const tokenWithBearer = req.headers.authorization;
  const token = tokenWithBearer?.split(" ");
  console.log(token);
});
