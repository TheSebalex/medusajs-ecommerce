import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

import { CollectionsButton } from "@modules/layout/components/collections-button"
import { getCollectionsList } from "@lib/data"

import navLogo from "./nav-logo.svg"
import navMobileLogo from "./nav-logo-mobile.svg"

import Image from "next/image"
import Link from "next/link"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  const { collections } = await getCollectionsList()

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-none duration-200 bg-[#7de2d1]">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <Link href={"/"} className="h-full flex items-center">
            <Image
              src={navMobileLogo}
              alt="logo"
              className="h-[77%] drop-shadow md:hidden"
            />
            <Image
              src={navLogo}
              alt="logo"
              className="h-[77%] hidden drop-shadow md:block"
            />
          </Link>
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <CollectionsButton collections={collections} />
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/blog"
                data-testid="nav-account-link"
              >
                Blog
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
              <SideMenu regions={regions} />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
