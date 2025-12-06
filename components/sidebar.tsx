// components/sidebar.tsx (Konsep Dasar)
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";

export const Sidebar = () => (
  <aside className="fixed top-0 left-0 h-screen w-64 bg-background border-r p-4 pt-20">
    <nav className="flex flex-col gap-2">
        <ThemeSwitch />
      {siteConfig.navItems.map((item) => (
        <NextLink key={item.href} href={item.href}>
          {item.label}
        </NextLink>
      ))}
    </nav>
  </aside>
);