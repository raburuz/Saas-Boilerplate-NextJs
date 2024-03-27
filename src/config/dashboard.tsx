/* LIBRARIES */
import { BarChart, Home, ListChecks, MessageCircle, SlidersHorizontal } from "lucide-react"

/* FOLDER */
import { IDashboardConfiguration } from "@/config"

export const dashboardConfig:IDashboardConfiguration = {
  links: {
    customer: {
      menu:[
        {
          text: "Home",
          href: "/",
          icon: <Home className="w-4 text-foreground/70"/>,
        },
        {
          text: "Dashboard",
          href: "/dashboard",
          icon: <BarChart className="w-4 text-foreground/70"/>,
        },
        {
          text: "Settings",
          href: "/settings/billing",
          icon: <SlidersHorizontal className="w-4 text-foreground/70"/>,
        },
        {
          text: "Changelog",
          href: "/settings/profile",
          icon: <ListChecks className="w-4 text-foreground/70"/>,
        },
      ],
      submenu:[
        {
          text: "Profile",
          href: "/settings/profile",
        },
        {
          text: "Pricing",
          href: "/pricing",
        },
        {
          text: "Billing",
          href: "/settings/billing",
        },
      ]
    },
    admin: {
      menu:[
        {
          text: "Overview",
          href: "/admin",
          icon: <BarChart className="w-4 text-foreground/70"/>,
        },
        {
          text: "Feedback",
          href: "/admin/feedback",
          icon: <MessageCircle className="w-4 text-foreground/70"/>,
        },
      ],
      submenu:[
        {
          text: "Home",
          href: "/",
          icon: <Home className="w-3 text-foreground/70"/>,
        },
        {
          text: "Changelog",
          href: "/changelog",
          icon: <ListChecks className="w-3 text-foreground/70"/>,
        },
      ]
    },
  },
  alerts: {
    queryKey:"alert",
    actions:{
      customer:[
        {
          queryValue: "payment_success",
          title: "Payment Successful 🎉",
          description: "You have successfully made your payment.😀",
          variant: "success",
        },
        {
          queryValue: "payment_failed",
          title: "Payment Failed :sad 😢",
          description: "Something was wrong. Please try again. We appreciate your understanding.",
          variant: "destructive",
        }
      ],
      admin:[],
    }
  }
}