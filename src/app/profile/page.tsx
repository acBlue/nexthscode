import { auth } from "@/auth/auth";
import { SettingsForm } from "@/components/auth/SettingsForm";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>
                <p className="mt-2 text-sm text-gray-600">
                    管理您的个人资料和账户安全
                </p>
            </div>
            <SettingsForm />
        </div>
      </div>
    </SessionProvider>
  );
}