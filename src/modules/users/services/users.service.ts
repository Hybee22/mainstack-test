import { Model } from "mongoose";
import { IUserModel } from "../../../models/User";
import { CreateUserDto } from "../dtos/CreateUserDto.dto";

export class UsersService {
  constructor(private userRepository: Model<IUserModel>) {}
  async createUser({ name, email, password }: CreateUserDto) {
    const user = await this.userRepository.create({
      name,
      email,
      password,
    });
    return user;
  }

  async createAdmin({ name, email, password }: CreateUserDto) {
    const user = await this.userRepository.create({
      name,
      email,
      password,
      role: "admin",
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository
      .find({
        role: "user",
      })
    return users;
  }

  async getAdmins() {
    const admins = await this.userRepository
      .find({
        role: "admin",
      })
    return admins;
  }

  async updateUser(id: string, data: any) {
    const user = await this.userRepository.findByIdAndUpdate(id, data, {
      new: true,
    });
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findByIdAndDelete(id);
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }
}
