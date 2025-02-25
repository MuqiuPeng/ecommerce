import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { ModalProvider } from "@/providers/modal-provider";
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const components : { title: string, href: string }[] = [
  { title: "Profile", href: "/profile"},
  { title: "Stores", href: "/store"},
];

function NavigationItems(components: { title: string, href: string }[]) {
  return components
    .map((component) => {
      return (
        <NavigationMenuItem>
          <Link href={component.href} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {component.title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )
    })
}

function Navigation(components: { title: string, href: string }[]) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NavigationItems(components)}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header>
            <nav className="flex items-center justify-between px-6 py-4 border-b">
              {Navigation(components)}
              <div className="ml-auto">
                <SignedOut>
                  <SignInButton>
                    <Button variant="outline">SignIn</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="ml-2">SignOut</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>
          </header>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
