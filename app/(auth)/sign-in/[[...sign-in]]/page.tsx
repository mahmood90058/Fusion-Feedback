"use client"

import { SignIn } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"

const Page = () => {
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null

  return (
    <div className="flex min-h-screen justify-center">
      <SignIn
        appearance={{
          theme: resolvedTheme === "light" ? dark : undefined,
        }}
      />
    </div>
  )
}

export default Page