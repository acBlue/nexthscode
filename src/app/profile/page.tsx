import { auth } from "@/auth/auth";
import { SettingsForm } from "@/components/auth/SettingsForm";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
        <Navbar />

        <main className="container mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              个人中心
            </h1>
            <p className="text-muted-foreground text-slate-500">
              管理您的个人资料、账户安全及系统设置。
            </p>
          </div>

          <Separator className="my-6 lg:hidden" />

          {/* Main Layout */}
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            {/* Sidebar Navigation (Desktop) */}
            <aside className="-mx-4 lg:w-1/5 px-4 hidden lg:block">
              <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                <a
                  href="#"
                  className="bg-white dark:bg-slate-800 shadow-sm justify-start rounded-md p-2 px-3 text-sm font-medium transition-colors hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50 border border-slate-200 dark:border-slate-700"
                >
                  账户设置
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:bg-transparent hover:underline justify-start rounded-md p-2 px-3 text-sm font-medium transition-colors cursor-not-allowed opacity-60"
                  aria-disabled="true"
                >
                  通知 (开发中)
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:bg-transparent hover:underline justify-start rounded-md p-2 px-3 text-sm font-medium transition-colors cursor-not-allowed opacity-60"
                  aria-disabled="true"
                >
                  外观 (开发中)
                </a>
              </nav>
            </aside>

            {/* Content Area */}
            <div className="flex-1 lg:max-w-4xl">
              <SettingsForm />
            </div>
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
