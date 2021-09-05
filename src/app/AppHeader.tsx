import {} from "@heroicons/react/outline"
import {
  LogoutIcon,
  ViewGridAddIcon,
  ViewGridIcon,
} from "@heroicons/react/solid"
import type { User } from "@supabase/supabase-js"
import clsx from "clsx"
import React from "react"
import { Link } from "wouter"
import { CreateBucketButton } from "../bucket/CreateBucketButton"
import { Button } from "../dom/Button"
import { supabase } from "../supabase/client"
import { fadedButtonClass, solidButtonClass } from "../ui/button"
import { maxWidthContainerClass } from "../ui/container"
import { inlineIconClass, leftButtonIconClass } from "../ui/icon"

export function AppHeader({ user }: { user: User | undefined }) {
  return (
    <div className="bg-gray-900 shadow">
      <header
        className={clsx(
          maxWidthContainerClass,
          "flex flex-wrap items-center justify-between py-6 gap-x-8 gap-y-2",
        )}
      >
        <h1 className="text-4xl font-light">
          <Link to="/">
            <ViewGridIcon className="inline-block w-8 translate-y-[-2px] mr-[-4px]" />{" "}
            <span>thoughtbucket</span>
          </Link>
        </h1>

        {user && (
          <nav className="flex flex-wrap items-baseline gap-5">
            <Button
              className={fadedButtonClass}
              onClick={() => supabase.auth.signOut()}
            >
              <LogoutIcon className={inlineIconClass} /> log out
            </Button>
            <CreateBucketButton className={solidButtonClass} user={user}>
              <ViewGridAddIcon className={leftButtonIconClass} /> new bucket
            </CreateBucketButton>
          </nav>
        )}
      </header>
    </div>
  )
}
