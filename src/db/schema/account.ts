import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    uuid,
    boolean,
   // type AdapterAccount, // 需要从 @auth/core/adapters 导入，或者直接忽略类型检查
} from "drizzle-orm/pg-core";
import {AdapterAccount} from "@auth/core/adapters";

// --- NextAuth v5 核心表结构 ---

// 1. 用户表
export const users = pgTable("user", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"), // 用于凭证登录 (邮箱+密码)
    role: text("role").default("user"), // 扩展字段：用户角色 (user/admin)
});

// 2. 账号表 (用于 OAuth，如 GitHub/Google 登录)
export const accounts = pgTable(
    "account",
    {
        userId: uuid("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

// 3. 会话表 (如果使用 Database Strategy)
export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: uuid("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

// 4. 验证令牌表 (用于邮箱验证链接)
export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);