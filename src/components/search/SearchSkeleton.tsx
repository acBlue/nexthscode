import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

function CardSkeleton() {
    return (
        <Card className="border-muted">
            <CardHeader className="pb-3 pt-5 px-5">
                <div className="flex justify-between items-start">
                    <div className="space-y-2 w-full">
                        <div className="flex gap-3">
                            <Skeleton className="h-7 w-32" /> {/* Code */}
                            <Skeleton className="h-7 w-64" /> {/* Name */}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-5 pb-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-20" />
                        <div className="grid grid-cols-2 gap-3">
                            <Skeleton className="h-16 w-full rounded-md" />
                            <Skeleton className="h-16 w-full rounded-md" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-12 w-full rounded-md" />
                        <div className="flex gap-2">
                             <Skeleton className="h-6 w-24" />
                             <Skeleton className="h-6 w-24" />
                        </div>
                    </div>
                 </div>
            </CardContent>
            <CardFooter className="py-3 px-5 bg-muted/20 flex justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-20" />
            </CardFooter>
        </Card>
    );
}

export default function SearchSkeleton() {
    return (
        <div className="flex gap-6 items-start animate-in fade-in duration-500">
            {/* 侧边栏骨架 */}
            <aside className="w-64 flex-shrink-0 hidden md:block space-y-6 mt-2">
                <Skeleton className="h-5 w-24 mb-4" />
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className="h-4 flex-grow" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                    ))}
                </div>
            </aside>

            {/* 结果列表骨架 */}
            <div className="flex-grow space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}