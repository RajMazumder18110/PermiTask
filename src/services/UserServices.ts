/** @notice Library imports */

export class UserServices {
  public static async create(data: any): Promise<string> {
    return new Promise((resolve) => resolve("123"));
  }

  public static async findByEmail(
    email: string,
    includePassword?: boolean
  ): Promise<{ id: string; email: string; password: string }> {
    return new Promise((resolve) =>
      resolve({ id: "123", email, password: "lol" })
    );
  }
}
