"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Layers, 
  Fish, 
  Wheat, 
  Droplet, 
  Cookie, 
  Gem, 
  Atom, 
  Shirt, 
  Footprints,
  Cpu,
  Car,
  Package,
  LucideIcon
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CategoryItem {
  id: string;
  code: string;
  name: string;
}

// 🛠️ 图标映射表：让每个大类都有对应的图标
// 根据海关大类逻辑进行简单映射，找不到的用默认 Package 图标
const iconMap: Record<string, LucideIcon> = {
  "I": Fish,        // 活动物
  "II": Wheat,      // 植物
  "III": Droplet,   // 油脂
  "IV": Cookie,     // 食品饮料
  "V": Gem,         // 矿产
  "VI": Atom,       // 化工
  "XI": Shirt,      // 纺织
  "XII": Footprints,// 鞋帽
  "XVI": Cpu,       // 机器电气
  "XVII": Car,      // 车辆
};

export default function CategoryGrid({ items }: { items: CategoryItem[] }) {
  // 只展示前 8 个，保持整洁
  const displayItems = items.slice(0, 8);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* 1. 标题区：居中对齐 */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            热门分类导航
          </h2>
          <p className="text-sm text-muted-foreground">
            精选高频查询类目，助您快速定位商品编码
          </p>
        </div>

        {/* 2. 卡片网格：限制宽度(max-w-5xl) + 强制居中(mx-auto) */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayItems.map((item) => {
            // 获取对应图标，没有则用默认
            const IconComponent = iconMap[item.code] || Package;

            return (
              <Link 
                key={item.id} 
                href={`/category?section=${item.id}`} 
                className="group block outline-none"
              >
                <Card className="h-full border-border/50 bg-background hover:bg-accent/50 hover:border-blue-200 hover:shadow-sm transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                  
                  <CardHeader className="p-5 flex flex-col items-center text-center space-y-3">
                    {/* 图标容器：圆形背景 + 悬停变色 */}
                    <div className="w-12 h-12 rounded-full bg-blue-50/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* 罗马数字 Badge */}
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-mono text-muted-foreground group-hover:text-blue-600 transition-colors">
                      SECTION {item.code}
                    </Badge>
                    
                    {/* 标题：限制行数，字体调小 */}
                    <CardTitle className="text-sm font-medium leading-relaxed text-foreground/80 group-hover:text-foreground line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                      {item.name}
                    </CardTitle>
                  </CardHeader>

                </Card>
              </Link>
            );
          })}
        </div>

        {/* 3. 底部按钮：居中 */}
        <div className="mt-10 text-center">
          <Button variant="outline" className="gap-2 px-6 h-10 text-sm font-medium rounded-full hover:border-blue-300 hover:bg-blue-50/50 transition-all" asChild>
            <Link href="/category">
              查看全部 {items.length} 个大类
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}