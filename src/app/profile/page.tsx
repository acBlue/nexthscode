import { auth } from "@/auth/auth";
import { SettingsForm } from "@/components/auth/SettingsForm";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Shield, Bell, Palette, Sparkles } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Navbar />

        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          
          {/* 页面标题 */}
          <div className="mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
              <User className="w-3.5 h-3.5" />
              账户与偏好管理
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              个人中心
            </h1>
            <p className="text-sm text-slate-500">
              管理您的个人信息、账号安全凭据与通关申报偏好设置。
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* 侧边导航 (Desktop) */}
            <aside className="w-full lg:w-64 shrink-0 bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs">
              <nav className="space-y-1">
                <a
                  href="#"
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  基本账户与安全
                </a>
                <span
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 opacity-60 cursor-not-allowed"
                >
                  <span className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4" />
                    税则变动通知
                  </span>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">即将上线</span>
                </span>
                <span
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 opacity-60 cursor-not-allowed"
                >
                  <span className="flex items-center gap-2.5">
                    <Palette className="w-4 h-4" />
                    偏好设置
                  </span>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">开发中</span>
                </span>
              </nav>
            </aside>

            {/* 表单内容区 */}
            <div className="flex-1 min-w-0 w-full">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                <SettingsForm />
              </div>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </SessionProvider>
  );
}
