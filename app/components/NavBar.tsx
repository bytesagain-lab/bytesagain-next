export default function NavBar() {
  return (
    <header style={{ padding: '14px 0', background: '#0a0a1a', borderBottom: '1px solid #1a1a2e' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '1.5em', fontWeight: 800, textDecoration: 'none', background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          BytesAgain
        </a>
        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/articles" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>Articles</a>
          <a href="/skills" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>Skills</a>
          <a href="/use-case" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>Cases</a>
        </nav>
      </div>
    </header>
  )
}
