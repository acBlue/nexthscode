import { z } from "zod";

// 登录校验规则
export const LoginSchema = z.object({
    email: z.string().email({
        message: "请输入有效的邮箱地址",
    }),
    password: z.string().min(1, {
        message: "请输入密码",
    }),
});

// 注册校验规则
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "请输入有效的邮箱地址",
    }),
    password: z.string().min(6, {
        message: "密码至少需要 6 个字符",
    }),
    name: z.string().min(1, {
        message: "请输入您的昵称",
    }),
});



// 个人设置校验规则
export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: "昵称不能为空",
  }),
  // 暂时不开放修改邮箱，因为涉及到重新验证
  // email: z.optional(z.string().email()),

})


export const PasswordSchema = z.object({
  // 当前密码 (用于验证身份)
  password: z.string().min(1, { 
    message: "请输入当前密码以进行验证" 
  }),
  
  // 新密码
  newPassword: z.string().min(6, { 
    message: "新密码至少需要 6 位" 
  }),
  
  // 确认新密码
  confirmPassword: z.string().min(6, { 
    message: "请再次输入新密码" 
  }),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "两次输入的密码不一致",
  path: ["confirmPassword"], // 错误信息会显示在 confirmPassword 输入框下方
})
.refine((data) => data.password !== data.newPassword, {
  message: "新密码不能与当前密码相同",
  path: ["newPassword"],
});