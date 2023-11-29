import { AppError, createToken } from "../../../helpers";
import { LoginUserType, RegisterUserType } from "../../../types";
import { UsersService } from "../../users/services/users.service";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private userService: UsersService) {}
  async registerUser(payload: RegisterUserType) {
    const user = await this.userService.createUser(payload);
    return user;
  }

  async registerAdmin(payload: RegisterUserType) {
    const user = await this.userService.createAdmin(payload);
    return user;
  }

  async loginUser(payload: LoginUserType) {
    const { email, password } = payload;
    const user = await this.userService.getUserByEmail(email);
    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      throw new AppError(401, `Invalid email or password`);
    }

    const access_token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { access_token };
  }
}
