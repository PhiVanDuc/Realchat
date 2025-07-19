import { Inter } from "next/font/google";
import "./globals.css";

import SocketProvider from "@/providers/socket-provider";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
});

export const metadata = {
    title: {
        default: "Realchat",
        template: "%s - Realchat"
    },
    default: "Dịch vụ nhắn tin hàng đầu. Kết nối, nâng cao, quản lý công việc và nâng cao hiệu suất. Từ văn phòng đến làm việc từ xa giúp bạn và đội nhóm hoàn thành mọi mục tiêu theo cách riêng.",
    icons: [
      {
        url: "/Logo.png",
        href: "/Logo.png"
      }
    ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-neutral-800 antialiased`}
      >
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
