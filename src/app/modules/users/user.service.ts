import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
    // const { password, ...remainingData } = payload;
    // const saltRounds = 12;
    // let hashedPassword;
    // hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashedPassword);
    const result = await User.create(payload);
    return result;
};


export const UserServices = {
    createUserIntoDB
}