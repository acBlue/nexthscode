import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaxItem {
  label: string;
  value: string | null;
  highlight?: boolean; 
  desc?: string; 
}

interface TaxInfoCardProps {
    title: string;
    items: TaxItem[];
    icon?: React.ElementType;
}

export default function TaxInfoCard({ title, items, icon: Icon }: TaxInfoCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 print:break-inside-avoid print:shadow-none print:border-black">
      <CardHeader className="px-5 py-4 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
           {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
           <CardTitle className="text-sm font-bold text-foreground">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
            {items.map((item, idx) => (
                <div key={idx}>
                    <div className="flex justify-between items-center px-5 py-3.5 hover:bg-muted/50 transition-colors group">
                        <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                            {item.label}
                        </span>
                        <div className="text-right flex flex-col items-end">
                            <span className={cn(
                                "font-mono font-bold text-sm",
                                item.highlight ? "text-lg text-blue-700" : "text-foreground"
                            )}>
                                {item.value || '-'}
                            </span>
                            {item.desc && (
                                <span className="text-[10px] text-muted-foreground mt-0.5 bg-secondary px-1.5 py-0.5 rounded-sm">
                                    {item.desc}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* 除了最后一行，都显示分割线 */}
                    {idx < items.length - 1 && <Separator className="bg-border/60" />}
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}