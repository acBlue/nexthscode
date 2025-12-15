import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { auth } from "@/auth/auth"; // 引入 auth
import { UserNav } from "@/components/auth/UserNav"; // 引入刚才写的 UserNav

export default async function Navbar() {
  // 1. 获取用户会话 (服务端)
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          
          {/* Logo 区域 */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                H
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                HS Code
              </span>
            </Link>

            {/* 桌面端导航链接 */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                首页
              </Link>
              <Link href="/category" className="hover:text-blue-600 transition-colors">
                分类大全
              </Link>
              <Link href="/search" className="hover:text-blue-600 transition-colors">
                高级搜索
              </Link>
            </div>
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center gap-4">
            
            {/* 搜索入口 (仅图标，可选) */}
            <Link href="/search" className="text-gray-400 hover:text-blue-600 p-2">
              <Search className="w-5 h-5" />
            </Link>

            {/* --- 核心修改：根据登录状态显示不同内容 --- */}
            {user ? (
              // 已登录：显示 UserNav
              <UserNav user={user} />
            ) : (
              // 未登录：显示登录/注册按钮
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  登录
                </Link>
                <Link 
                  href="/register" 
                  className="hidden sm:block text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                >
                  注册
                </Link>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
}