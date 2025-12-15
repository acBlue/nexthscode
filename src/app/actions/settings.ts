"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProfileSchema, PasswordSchema } from "@/lib/schemas"; // 确保引入了新拆分的 Schema
import { auth } from "@/auth/auth"; 

// ==========================================
// Action 1: 更新个人资料 (昵称/头像等)
// ==========================================
export const settings = async (values: z.infer<typeof ProfileSchema>) => {
  // 1. 验证用户身份
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return { error: "未授权的操作" };
  }

  // 2. 验证参数格式
  const validatedFields = ProfileSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "参数格式无效" };
  }

  const { name } = validatedFields.data;

  // 3. 更新数据库 (只更新 profile 相关字段)
  try {
    await db.update(users)
      .set({
        name: name,
        // email: email, // 如果未来允许改邮箱，在这里加
      })
      .where(eq(users.id, user.id));

    return { success: "个人资料已更新！" };
  } catch (error) {
    return { error: "更新失败，请稍后重试" };
  }
};

// ==========================================
// Action 2: 修改密码
// ==========================================
export const newPassword = async (values: z.infer<typeof PasswordSchema>) => {
  // 1. 验证用户身份
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return { error: "未授权的操作" };
  }

  // 2. 验证参数格式 (Zod 会自动校验两次密码是否一致)
  const validatedFields = PasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "参数格式无效" };
  }

  const { password, newPassword } = validatedFields.data;

  // 3. 获取数据库中的真实用户数据 (为了拿旧密码 hash)
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (!dbUser || !dbUser.password) {
    return { error: "用户不存在或未设置密码" };
  }

  // 4. 核心安全检查：验证当前密码是否正确
  const passwordsMatch = await bcrypt.compare(password, dbUser.password);
  
  if (!passwordsMatch) {
    return { error: "当前密码输入错误" };
  }

  // 5. 加密新密码
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 6. 更新数据库
  try {
    await db.update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, user.id));

    return { success: "密码修改成功" };
  } catch (error) {
    return { error: "修改失败，请稍后重试" };
  }
};