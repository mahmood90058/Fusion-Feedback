"use client"

import { SignUp } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"

const Page = () => {
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null

  return (
    <div className="flex min-h-screen justify-center">
      <SignUp
        appearance={{
          theme: resolvedTheme === "light" ? dark : undefined
        }}
      />
    </div>
  )
}

export default Page