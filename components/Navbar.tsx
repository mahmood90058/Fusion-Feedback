"use client";

import { Map, MessageSquare, Shield, Sparkle } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        <div className="flex items-center gap-6">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkle className="h-4 w-4 text-white" />
              </div>

              <span className="text-xl font-bold">
                Feedback Fusion
              </span>
            </div>
          </Link>

          {/* Roadmap */}
          <Link
            href="/roadmap"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <Map className="h-4 w-4" />
            Roadmap
          </Link>

          {/* Feedback */}
          <Link
            href="/feedback"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Link>

          {/* Admin */}
          <Show when="signed-in">
            <Link
              href="/admin"
              className="text-sm hover:text-primary transition-colors flex items-center gap-1"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          </Show>
        </div>

        <div className="flex items-center gap-4">

          <ThemeToggle />

          {/* Sign In - only when logged out */}
          <Show when="signed-out">
            <SignInButton>
              <Button>
                Sign In
              </Button>
            </SignInButton>
          </Show>

          {/* User - only when logged in */}
          <Show when="signed-in">
            <UserButton />
          </Show>

        </div>
      </div>
    </nav>
  );
}