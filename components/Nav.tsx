'use client'

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] px-8 py-[14px]"
      style={{
        borderColor: 'var(--color-ink)',
        backgroundColor: 'var(--color-bg)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-black tracking-[-0.5px]" style={{ color: 'var(--color-ink)' }}>
          SANLI
        </span>
        <span
          className="h-[9px] w-[9px] rounded-full border-[2px]"
          style={{ backgroundColor: 'var(--color-accent-green)', borderColor: 'var(--color-ink)' }}
        />
      </div>

      {/* Links */}
      <div className="flex gap-[22px] font-mono text-[11px] font-bold uppercase tracking-[2px] opacity-45">
        <a href="#projects" className="transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>项目</a>
        <a href="#about"    className="transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>关于</a>
        <a href="#insights" className="transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>文章</a>
        <a href="#contact"  className="transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>联系</a>
      </div>
    </nav>
  )
}
