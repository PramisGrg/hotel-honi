import {
  Rss,
  Settings,
  SquareUserRound,
  Utensils,
  LayoutGrid,
  LucideIcon,
  ShoppingCart,
  Building,
  DollarSign,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/home",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Room & Spaces",
          icon: Building,
          submenus: [
            {
              href: "/dashboard/rooms",
              label: "Rooms",
            },
            {
              href: "/dashboard/spaces",
              label: "Spaces",
            },
          ],
        },
        {
          href: "",
          label: " Food & Menu",
          icon: Utensils,
          submenus: [
            {
              href: "/dashboard/dishes",
              label: "Dishes",
            },
            {
              href: "/dashboard/categories",
              label: "Categories",
            },
          ],
        },
        {
          href: "/sidebar/food-menu/categories",
          label: "Inventory",
          icon: ShoppingCart,
        },
        {
          href: "",
          label: "Customer & Supplier",
          icon: SquareUserRound,
          submenus: [
            {
              href: "/dashboard/customers",
              label: "Customer",
            },
            {
              href: "/dashboard/suppliers",
              label: "Supplier",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/website",
          label: "Website",
          icon: Rss,
        },
        {
          href: "/users",
          label: "Finance",
          icon: DollarSign,
        },
        {
          href: "/dashboard/setting",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
