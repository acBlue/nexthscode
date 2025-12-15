"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// 1. 引入拆分后的 Schema
import { ProfileSchema, PasswordSchema } from "@/lib/schemas";
// 假设后端也拆分了 Action，或者同一个 Action 根据参数不同处理
// 建议后端拆分为: settings(修改资料) 和 newPassword(修改密码)
import { settings, newPassword as changePasswordAction } from "@/app/actions/settings"; 
import { Loader2, User, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Shadcn UI Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const SettingsForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const user = session?.user;

  // 2. 表单 1: 个人资料 Form
  const profileForm = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || "",
      // email: user?.email || "", // 如果需要修改邮箱
    },
  });

  // 3. 表单 2: 密码 Form
  const passwordForm = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 4. 提交逻辑 A: 修改资料
  const onProfileSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      settings(values).then((data) => {
        if (data.error) {
          toast.error("保存失败", { description: data.error });
        }
        if (data.success) {
          update(); // 更新 Session 中的 name
          router.refresh();
          toast.success("保存成功", { description: "您的个人设置已更新" });
        }
      });
    });
  };

  // 5. 提交逻辑 B: 修改密码
  const onPasswordSubmit = (values: z.infer<typeof PasswordSchema>) => {
    startTransition(() => {
      // 这里的 changePasswordAction 需要你确认后端是否有对应的新 Action
      changePasswordAction(values).then((data) => {
        if (data.error) {
          toast.error("修改失败", { description: data.error });
        }
        if (data.success) {
          toast.success("修改成功", { description: "您的密码已重置，请下次使用新密码登录" });
          passwordForm.reset(); // 成功后清空密码框
        }
      });
    });
  };

  // 提取头像首字母
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">账户设置</h3>
        <p className="text-sm text-muted-foreground">
          管理您的个人资料、密码及账户偏好。
        </p>
      </div>
      <Separator />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="general">基本资料</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
        </TabsList>

        {/* --- Tab 1: 基本资料 --- */}
        <TabsContent value="general">
          {/* 这里只包裹 profileForm */}
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>个人资料</CardTitle>
                  <CardDescription>
                    这是别人在平台上看到您的样子。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* 头像展示区 */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user?.image || ""} />
                      <AvatarFallback className="text-lg bg-blue-100 text-blue-700">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{user?.name}</h4>
                      <p className="text-xs text-muted-foreground">支持 JPG, PNG 格式</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>昵称</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="您的昵称"
                            />
                          </FormControl>
                          <FormDescription>
                            这将显示在您的导航栏和个人中心。
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* 只读邮箱 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        邮箱
                      </label>
                      <Input value={user?.email || ""} disabled className="bg-muted" />
                      <p className="text-[0.8rem] text-muted-foreground">
                        邮箱地址暂不支持修改。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                  保存更改
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        {/* --- Tab 2: 安全设置 --- */}
        <TabsContent value="security">
          {/* 这里只包裹 passwordForm */}
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>修改密码</CardTitle>
                  <CardDescription>
                    为了您的账户安全，建议定期更换密码。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>当前密码</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            placeholder="******"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>新密码</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            placeholder="******"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>确认新密码</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            placeholder="******"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                  重置密码
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};