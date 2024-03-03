"use client";

/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import * as ConfirmDialog from "@/context/dialog-confirm";
import * as LoaderDialog from "@/context/dialog-loader";
import { classNames } from "@/lib/classNames";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  TableCellsIcon,
  TruckIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Wallet2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ToastProvider from "../(tabs)/toast-provider";

export const dynamic = "force-dynamic";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let currentPath = "orders";
  if (pathname.includes("/dashboard/chats")) {
    currentPath = "chats";
  }
  if (pathname.includes("/dashboard/announcements")) {
    currentPath = "announcements";
  }
  if (pathname.includes("/dashboard/summary")) {
    currentPath = "summary";
  }
  if (pathname.includes("/dashboard/suppliers")) {
    currentPath = "suppliers";
  }
  if (pathname.includes("/dashboard/supply/groups")) {
    currentPath = "supply/groups";
  }
  if (pathname.includes("/dashboard/supply/sku")) {
    currentPath = "supply/sku";
  }
  if (pathname.includes("/dashboard/supplies")) {
    currentPath = "supplies";
  }
  if (pathname.includes("/dashboard/assortments")) {
    currentPath = "assortments";
  }
  if (pathname.includes("/dashboard/assortments/price-increase")) {
    currentPath = "price-increase";
  }
  if (pathname.includes("/dashboard/orders/single")) {
    currentPath = "orders/single";
  }
  if (pathname.includes("/dashboard/fulfillments/processing")) {
    currentPath = "fulfillments/processing";
  }
  if (pathname.includes("/dashboard/fulfillments/ready")) {
    currentPath = "fulfillments/ready";
  }
  if (pathname.includes("/dashboard/fulfillments/dispatched")) {
    currentPath = "fulfillments/dispatched";
  }
  if (pathname.includes("/dashboard/fulfillments/en-route")) {
    currentPath = "fulfillments/en-route";
  }
  if (pathname.includes("/dashboard/points")) {
    currentPath = "points";
  }
  if (pathname.includes("/dashboard/installments/overdue")) {
    currentPath = "installments/overdue";
  }
  if (pathname.includes("/dashboard/checkouts/failed")) {
    currentPath = "checkouts/failed";
  }
  if (pathname.includes("/dashboard/refunds")) {
    currentPath = "refunds";
  }
  if (pathname.includes("/dashboard/orders/combine")) {
    currentPath = "combine";
  }
  if (pathname.includes("/dashboard/orders/split")) {
    currentPath = "split";
  }
  if (pathname.includes("/dashboard/segmentations")) {
    currentPath = "segmentations";
  }
  if (pathname.includes("/vouchers")) {
    currentPath = "vouchers";
  }
  if (pathname.includes("/notifications/v1/email")) {
    currentPath = "notifications/email";
  }
  if (pathname.includes("/notifications/v1/mobile")) {
    currentPath = "notifications/mobile";
  }
  if (pathname.includes("/collections")) {
    currentPath = "item-set";
  }
  if (pathname.includes("/artist")) {
    currentPath = "artist";
  }
  if (pathname.includes("/users")) {
    currentPath = "users";
  }
  const navigation = [
    {
      name: "Orders",
      href: "/dashboard",
      icon: TruckIcon,
      current: currentPath === "orders",
    },
    {
      name: "Combine Orders",
      href: "/dashboard/orders/combine",
      icon: TruckIcon,
      current: currentPath === "combine",
    },
    {
      name: "Split Order",
      href: "/dashboard/orders/split",
      icon: TruckIcon,
      current: currentPath === "split",
    },
    {
      name: "Overdue Installment",
      href: "/dashboard/installments/overdue",
      icon: TruckIcon,
      current: currentPath === "installments/overdue",
    },
    {
      name: "Failed Checkouts",
      href: "/dashboard/checkouts/failed",
      icon: TruckIcon,
      current: currentPath === "checkouts/failed",
    },
    {
      name: "Orders Summary",
      href: "/dashboard/summary",
      icon: TruckIcon,
      current: currentPath === "summary",
      endSection: true,
    },
    {
      name: "Supplies",
      href: "/dashboard/supplies",
      icon: UserGroupIcon,
      current: currentPath === "supplies",
    },
    {
      name: "Supplier",
      href: "/dashboard/suppliers",
      icon: UserGroupIcon,
      current: currentPath === "suppliers",
    },
    {
      name: "SKU",
      href: "/dashboard/supply/sku",
      icon: TableCellsIcon,
      current: currentPath === "supply/sku",
    },
    {
      name: "Assortments",
      href: "/dashboard/assortments",
      icon: ArchiveBoxIcon,
      current: currentPath === "assortments",
    },
    {
      name: "Item Set",
      href: "/dashboard/collections",
      icon: ArchiveBoxIcon,
      current: currentPath === "item-set",
    },
    {
      name: "Artist",
      href: "/dashboard/collections/artist",
      icon: ArchiveBoxIcon,
      current: currentPath === "artist",
    },
    {
      name: "Price Increase History",
      href: "/dashboard/assortments/price-increase",
      icon: ArchiveBoxIcon,
      current: currentPath === "price-increase",
      endSection: true,
    },
    {
      name: "Ready to Fulfill",
      href: "/dashboard/fulfillments/ready",
      icon: TruckIcon,
      current: currentPath === "fulfillments/ready",
    },
    {
      name: "Processing",
      href: "/dashboard/fulfillments/processing",
      icon: TruckIcon,
      current: currentPath === "fulfillments/processing",
    },
    {
      name: "Dispatched",
      href: "/dashboard/fulfillments/dispatched",
      icon: TruckIcon,
      current: currentPath === "fulfillments/dispatched",
    },
    {
      name: "En Route",
      href: "/dashboard/fulfillments/en-route",
      icon: TruckIcon,
      current: currentPath === "fulfillments/en-route",
      endSection: true,
    },
    {
      name: "Segmentations",
      href: "/dashboard/segmentations",
      icon: UserGroupIcon,
      current: currentPath === "segmentations",
    },
    {
      name: "Email",
      href: "/dashboard/notifications/v1/email",
      icon: EnvelopeIcon,
      current: currentPath === "notifications/email",
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications/v1/mobile",
      icon: BellAlertIcon,
      current: currentPath === "notifications/mobile",
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: UserIcon,
      current: currentPath === "users",
    },
    {
      name: "Vouchers",
      href: "/dashboard/vouchers",
      icon: Wallet2Icon,
      current: currentPath === "vouchers",
    },
    {
      name: "Refunds",
      href: "/dashboard/refunds",
      icon: Wallet2Icon,
      current: currentPath === "refunds",
    },
    {
      name: "Chat",
      href: "/dashboard/chats",
      icon: ChatBubbleLeftRightIcon,
      current: currentPath === "chats",
    },
    {
      name: "Announcements",
      href: "/dashboard/announcements",
      icon: ChatBubbleLeftRightIcon,
      current: currentPath === "announcements",
    },
    {
      name: "Points",
      href: "/dashboard/points",
      icon: CurrencyDollarIcon,
      current: currentPath === "points",
    },
  ];

  return (
    <>
      <div className="h-full bg-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image alt="logo" height={50} width={185} src="/shopverse-logo-full.png" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-black"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-black",
                                    "group flex gap-x-3 rounded-md p-2 text-base font-semibold leading-6"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-black"
                                        : "text-gray-400 group-hover:text-black",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <div>{item.name}</div>
                                </a>
                                {item.endSection && <div className="h-[1px] bg-gray-200" />}
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-base font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-black"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-black"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Image alt="logo" height={50} width={185} src="/shopverse-logo-full.png" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-black"
                              : "text-gray-700 hover:bg-gray-50 hover:text-black",
                            "group flex gap-x-3 rounded-md p-2 text-base font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? "text-black" : "text-gray-400 group-hover:text-black",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          <div>{item.name}</div>
                        </Link>
                        {item.endSection && <div className="h-[1px] bg-gray-200" />}
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-base font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-black"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-black"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex h-full flex-col lg:pl-72">
          <main className="flex h-full flex-col">
            <div className="flex-grow">
              <QueryClientProvider client={queryClient}>
                <ToastProvider>
                  <ConfirmDialog.Provider>
                    <LoaderDialog.Provider>{children}</LoaderDialog.Provider>
                  </ConfirmDialog.Provider>
                </ToastProvider>
              </QueryClientProvider>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
