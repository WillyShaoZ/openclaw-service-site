'use client';

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    wechat: '',
    address: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', wechat: '', address: '', notes: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main style={styles.main}>
      <div style={styles.scanline} />
      
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>OpenClaw</span>
        </div>
        <div style={styles.tagline}>Melbourne Installation Service</div>
      </header>

      <section style={styles.hero}>
        <h1 style={styles.title}>
          <span style={styles.titleAccent}>本地</span> AI 助手
          <br />上门安装服务
        </h1>
        <p style={styles.subtitle}>
          墨尔本首家 · 上门调试 · 全程部署
        </p>
        <div style={styles.price}>
          <span style={styles.priceLabel}>基础安装</span>
          <span style={styles.priceValue}>$200</span>
          <span style={styles.priceUnit}>AUD</span>
        </div>
      </section>

      <section style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🚀</div>
          <h3 style={styles.featureTitle}>快速上门</h3>
          <p style={styles.featureText}>墨尔本地区快速响应，专业团队上门服务</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🔧</div>
          <h3 style={styles.featureTitle}>全程调试</h3>
          <p style={styles.featureText}>环境配置、插件安装、个性化定制</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>💎</div>
          <h3 style={styles.featureTitle}>终身售后</h3>
          <p style={styles.featureText}>后续问题随时咨询，技术支持有保障</p>
        </div>
      </section>

      <section style={styles.pricing}>
        <h2 style={styles.sectionTitle}>服务定价</h2>
        <div style={styles.priceTable}>
          <div style={styles.priceRow}>
            <span>基础安装</span>
            <span style={styles.priceHighlight}>$200 AUD</span>
          </div>
          <div style={styles.priceRow}>
            <span>插件配置 (+)</span>
            <span>$50-100 AUD/项</span>
          </div>
          <div style={styles.priceRow}>
            <span>远程协助</span>
            <span>$30 AUD/次</span>
          </div>
        </div>
      </section>

      <section style={styles.contact}>
        <h2 style={styles.sectionTitle}>联系我们</h2>
        <div style={styles.contactGrid}>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>📱</span>
            <span>电话 / SMS</span>
            <a href="tel:0404309625" style={styles.contactValue}>0404 309 625</a>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>💬</span>
            <span>微信</span>
            <span style={styles.contactValue}>WillyShaoZ</span>
          </div>
        </div>
      </section>

      <section style={styles.booking}>
        <h2 style={styles.sectionTitle}>预约安装</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>姓名 *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              style={styles.input}
              placeholder="请输入您的姓名"
            />
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>电话 *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                style={styles.input}
                placeholder="04xx xxx xxx"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>微信</label>
              <input
                type="text"
                value={form.wechat}
                onChange={e => setForm({...form, wechat: e.target.value})}
                style={styles.input}
                placeholder="微信号"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>地址 *</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={e => setForm({...form, address: e.target.value})}
              style={styles.input}
              placeholder="墨尔本地区地址"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>备注</label>
            <textarea
              value={form.notes}
              onChange={e => setForm({...form, notes: e.target.value})}
              style={styles.textarea}
              placeholder="需要安装哪些插件？有什么特殊需求？"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              ...styles.button,
              opacity: status === 'loading' ? 0.6 : 1
            }}
          >
            {status === 'loading' ? '提交中...' : '立即预约'}
          </button>

          {status === 'success' && (
            <div style={styles.success}>✅ 预约成功！我们会尽快联系您</div>
          )}
          {status === 'error' && (
            <div style={styles.error}>❌ 提交失败，请稍后重试或直接电话联系</div>
          )}
        </form>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 OpenClaw Melbourne Service · 墨尔本上门安装</p>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  scanline: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.03) 2px, rgba(0,255,136,0.03) 4px)',
    pointerEvents: 'none',
    zIndex: 1000,
  },
  header: {
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0,255,136,0.2)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    fontSize: '28px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  tagline: {
    color: '#888',
    fontSize: '14px',
  },
  hero: {
    textAlign: 'center',
    padding: '80px 20px 60px',
  },
  title: {
    fontSize: 'clamp(32px, 6vw, 56px)',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: '20px',
  },
  titleAccent: {
    background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '18px',
    color: '#aaa',
    marginBottom: '40px',
  },
  price: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0,255,136,0.1)',
    border: '1px solid #00ff88',
    borderRadius: '50px',
    padding: '15px 30px',
  },
  priceLabel: {
    color: '#00ff88',
    fontSize: '14px',
  },
  priceValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#00ff88',
  },
  priceUnit: {
    color: '#888',
    fontSize: '14px',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '40px',
    marginBottom: '15px',
  },
  featureTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#00ff88',
  },
  featureText: {
    color: '#888',
    fontSize: '14px',
    lineHeight: 1.6,
  },
  pricing: {
    padding: '60px 20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#fff',
  },
  priceTable: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(0,255,136,0.2)',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fontSize: '16px',
  },
  priceHighlight: {
    color: '#00ff88',
    fontWeight: 'bold',
  },
  contact: {
    padding: '60px 20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  contactItem: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '25px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  contactIcon: {
    fontSize: '30px',
  },
  contactValue: {
    color: '#00ff88',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  booking: {
    padding: '60px 20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  form: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    padding: '30px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#aaa',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  success: {
    marginTop: '15px',
    padding: '15px',
    background: 'rgba(0,255,136,0.1)',
    border: '1px solid #00ff88',
    borderRadius: '8px',
    color: '#00ff88',
    textAlign: 'center',
  },
  error: {
    marginTop: '15px',
    padding: '15px',
    background: 'rgba(255,0,0,0.1)',
    border: '1px solid #ff4444',
    borderRadius: '8px',
    color: '#ff4444',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666',
    fontSize: '14px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
};
