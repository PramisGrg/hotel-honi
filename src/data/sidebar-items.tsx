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
  User,
  Notebook,
  UserCog,
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

export function getMenuList(): Group[] {
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
          href: "/dashboard/order",
          label: "Order",
          icon: Notebook,
        },
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
            {
              href: "/dashboard/tables",
              label: "Tables",
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
          href: "/dashboard/inventory",
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
        {
          href: "/dashboard/staff",
          label: "Staff",
          icon: User,
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
          icon: UserCog,
        },
        {
          href: "/dashboard/hotel-setting",
          label: "Hotel Setting",
          icon: Settings,
        },
      ],
    },
  ];
}
