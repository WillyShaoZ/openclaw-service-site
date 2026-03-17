import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

// 环境变量检查
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, wechat, address, notes } = body;

    // 验证必填字段
    if (!name || !phone || !address) {
      return NextResponse.json(
        { error: '请填写必填字段' },
        { status: 400 }
      );
    }

    // 构建消息
    const message = `
🔔 *新订单通知*

👤 姓名: ${name}
📱 电话: ${phone}
💬 微信: ${wechat || '未填写'}
📍 地址: ${address}
📝 备注: ${notes || '无'}
⏰ 时间: ${new Date().toLocaleString('Australia/Melbourne')}
`;

    // 发送到 Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);
      await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
    }

    // 这里可以添加保存到数据库的逻辑
    // 目前先保存到本地文件
    const fs = require('fs');
    const path = require('path');
    const logFile = path.join(process.cwd(), 'bookings.log');
    const logEntry = `${new Date().toISOString()} | ${name} | ${phone} | ${wechat || '-'} | ${address} | ${notes || '-'}\n`;
    
    try {
      fs.appendFileSync(logFile, logEntry);
    } catch (e) {
      console.log('无法写入日志文件:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
