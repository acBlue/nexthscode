import { Skeleton } from "@/components/ui/skeleton";

export default function SearchSkeleton() {
  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 py-8">
      {/* 顶部搜索栏骨架 */}
      <div className="h-14 bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-between">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-10 w-96 rounded-xl" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>

      <div className="flex gap-8 items-start pt-4">
        {/* 左侧侧边栏骨架 */}
        <div className="w-72 hidden md:block space-y-3">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>

        {/* 右侧列表骨架 */}
        <div className="flex-1 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <Skeleton className="h-8 w-36 rounded-xl" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-12 w-48 rounded-xl" />
              </div>
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-lg" />
                <Skeleton className="h-6 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
