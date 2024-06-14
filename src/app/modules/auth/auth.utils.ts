import bcrypt from "bcrypt"

export const isPasswordMatch = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
};