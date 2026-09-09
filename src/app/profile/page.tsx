import { Suspense } from "react";
import { auth } from "@/auth/auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { User } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-slate-50/60 dark:bg-[#080c14] flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
        <Navbar />

        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          
          {/* 页面标题 */}
          <div className="mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-500/30">
              <User className="w-3.5 h-3.5" />
              个人工作台 & 资产管理
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              个人中心
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              管理您的常查海关税号清单、浏览足迹与账号安全设置。
            </p>
          </div>

          <Suspense fallback={<div className="h-96 w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/[0.08] animate-pulse" />}>
            <ProfileTabs />
          </Suspense>

        </main>

        <Footer />
      </div>
    </SessionProvider>
  );
}
