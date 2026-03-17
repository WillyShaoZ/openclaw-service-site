import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenClaw 墨尔本上门安装服务',
  description: '墨尔本首家 AI 助手上门安装服务，基础安装 $200 澳币，插件配置另计',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
