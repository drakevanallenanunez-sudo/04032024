import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Footer: React.FC = () => {
  return (
    <footer
      className="py-16 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fce4ec 0%, #f0f7ff 100%)',
        borderTop: '1px solid rgba(91,141,217,0.12)',
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <span
            className="font-script"
            style={{ fontSize: '2rem', color: 'var(--primary)', lineHeight: 1 }}
          >
            Klyanne
          </span>
        </div>

        <p
          className="font-script"
          style={{ fontSize: '1.6rem', color: 'var(--muted-foreground)', opacity: 0.7 }}
        >
          Made with every heartbeat. 💙
        </p>

        <div className="flex items-center gap-6 text-xs" style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}>
          <span>© 2026</span>
          <span>·</span>
          <span>For Klyanne Paran</span>
          <span>·</span>
          <span>Always & Forever</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;