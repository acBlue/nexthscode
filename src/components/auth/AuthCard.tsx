"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean; // 预留给未来 Google 登录
}

export const AuthCard = ({
  children,
  title,
  description,
  backButtonLabel,
  backButtonHref,
}: AuthCardProps) => {
  return (
    <Card className="w-[400px] shadow-lg border-muted">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
        <Button variant="ghost" className="gap-2 w-full text-muted-foreground" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};