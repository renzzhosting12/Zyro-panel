 "use client";
import { useMemo, useState } from "react";

type ServerItem = { id:number; name:string; runtime:string; status:"ONLINE"|"OFFLINE"; ram:string; cpu:string; expires:string };
const initialServers: ServerItem[] = [
  { id:1, name:"renzzgabut", runtime:"Node.js", status:"ONLINE", ram:"320 MB / 2 GB", cpu:"12%", expires:"25 Okt 2026" },
  { id:2, name:"python-worker", runtime:"Python", status:"OFFLINE", ram:"0 MB / 1 GB", cpu:"0%", expires:"30 Okt 2026" }
];

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [servers, setServers] = useState(initialServers);
  const [active, setActive] = useState("Dashboard");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRuntime, setNewRuntime] = useState("Node.js");
  const filtered = useMemo(() => servers.filter(s => s.name.toLowerCase().includes(query.toLowerCase())), [servers, query]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 4) { setNotice("Masukkan email dan password minimal 4 karakter."); return; }
    setLoggedIn(true); setAdmin(email.toLowerCase().includes("admin"));
    setNotice("Berhasil masuk ke antarmuka demo. Hubungkan backend sebelum dipakai untuk server sungguhan.");
  }
  function toggleServer(id:number, action:string) {
    setServers(old => old.map(s => s.id === id ? {...s, status: action === "Start" || action === "Restart" ? "ONLINE" : "OFFLINE"} : s));
    setNotice(`${action} diterapkan pada tampilan demo. Aksi server nyata memerlukan backend + Wings di VPS.`);
  }
  function createServer(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setServers(old => [...old, {id:Date.now(), name:newName.trim(), runtime:newRuntime, status:"OFFLINE", ram:"0 MB / 1 GB", cpu:"0%", expires:"Belum ditentukan"}]);
    setNewName(""); setShowCreate(false); setNotice("Server demo ditambahkan. Ini belum membuat container sungguhan.");
  }

  if (!loggedIn) return <main className="login-shell">
    <div className="login-card">
      <div className="brand-mark">Z</div>
      <p className="eyebrow">CUSTOM GAME & APP HOSTING</p>
      <h1>Zyro<span>Panel</span></h1>
      <p className="muted">Masuk ke dashboard hosting kamu</p>
      <form onSubmit={login} className="login-form">
        <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="admin@example.com" required />
        <label>Password</label><input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Masukkan password" required />
        <button className="primary full" type="submit">Masuk ke Panel ↗</button>
      </form>
      <div className="demo-note"><b>Catatan:</b> ini starter UI untuk deploy Vercel. Login demo tidak memakai akun bawaan dan belum menjadi autentikasi produksi.</div>
    </div>
  </main>;

  const nav = ["Dashboard","Servers","Users","Nodes","Activity Logs","Settings"];
  return <main className="app-shell">
    <aside className="sidebar">
      <div className="logo"><div className="logo-box">Z</div><div><b>ZYRO<span>PANEL</span></b><small>HOSTING CONTROL</small></div></div>
      <div className="side-label">WORKSPACE</div>
      {nav.filter(n => n !== "Users" && n !== "Nodes" && n !== "Activity Logs" || admin).map(n=><button key={n} className={`nav-item ${active===n?"selected":""}`} onClick={()=>setActive(n)}><span>{({"Dashboard":"▦","Servers":"▣","Users":"♙","Nodes":"◈","Activity Logs":"≋","Settings":"⚙"} as any)[n]}</span>{n}</button>)}
      <div className="sidebar-bottom"><div className="avatar">{admin?"A":"U"}</div><div className="user-meta"><b>{admin?"Panel Admin":"Panel User"}</b><small>{email}</small></div><button className="logout" onClick={()=>{setLoggedIn(false);setNotice("");}}>↪</button></div>
    </aside>
    <section className="main-area">
      <header className="topbar"><div className="crumb">Workspace <span>/</span> {active}</div><div className="top-right"><span className="secure-dot"></span> Panel status: <b>Ready</b><div className="avatar small">{admin?"A":"U"}</div></div></header>
      <div className="content">
        <div className="hero">
          <div className="hero-copy"><div className="pill">✦ CONTROL CENTER</div><h1>Kelola server,<br/><span>tanpa ribet.</span></h1><p>Kelola aplikasi Node.js dan Python dari satu dashboard.</p><button className="primary" onClick={()=>{setActive("Servers");setShowCreate(true)}}>＋ Buat server</button></div>
          <div className="hero-art"><div className="orb orb1"></div><div className="orb orb2"></div><div className="cube">Z</div><div className="art-caption">YOUR INFRASTRUCTURE<br/><b>UNDER CONTROL</b></div></div>
        </div>
        {notice && <div className="notice"><span>ⓘ</span>{notice}<button onClick={()=>setNotice("")}>×</button></div>}
        {active==="Dashboard" && <>
          <div className="section-head"><div><h2>Overview</h2><p>Ringkasan resource panel kamu.</p></div><span className="date-chip">● Semua sistem demo</span></div>
          <div className="stats-grid">
            <Stat label="Total Servers" value={String(servers.length).padStart(2,"0")} sub="server terdaftar" icon="▣"/>
            <Stat label="Online Servers" value={String(servers.filter(s=>s.status==="ONLINE").length).padStart(2,"0")} sub="sedang berjalan (demo)" icon="↗"/>
            <Stat label="CPU Usage" value="12.4%" sub="penggunaan contoh" icon="⌁"/>
            <Stat label="Memory Usage" value="320 MB" sub="data contoh" icon="▤"/>
          </div>
          <div className="section-head server-heading"><div><h2>Server kamu</h2><p>Server terbaru di workspace.</p></div><button className="outline" onClick={()=>setActive("Servers")}>Lihat semua ↗</button></div>
          <ServerList servers={servers.slice(0,3)} toggleServer={toggleServer}/>
        </>}
        {active==="Servers" && <><div className="section-head"><div><h2>Servers</h2><p>Kelola instance Node.js dan Python.</p></div><button className="primary" onClick={()=>setShowCreate(true)}>＋ Buat server</button></div><input className="search" placeholder="Cari server..." value={query} onChange={e=>setQuery(e.target.value)}/><ServerList servers={filtered} toggleServer={toggleServer}/></>}
        {active==="Users" && <PanelPlaceholder title="User Management" desc="Daftar user dan peran admin akan ditampilkan setelah backend autentikasi dipasang." />}
        {active==="Nodes" && <PanelPlaceholder title="Nodes" desc="Daftarkan VPS/node dan koneksi Wings di backend untuk melihat status real." />}
        {active==="Activity Logs" && <PanelPlaceholder title="Activity Logs" desc="Log audit produksi harus disimpan di database backend." />}
        {active==="Settings" && <PanelPlaceholder title="Settings" desc="Pengaturan branding dan workspace starter panel." />}
        <footer>ZYRO PANEL <span>© 2026</span><span className="footer-right">CUSTOM HOSTING UI · VERCEL STARTER</span></footer>
      </div>
    </section>
    {showCreate && <div className="modal-backdrop" onClick={()=>setShowCreate(false)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={createServer}><button type="button" className="modal-close" onClick={()=>setShowCreate(false)}>×</button><div className="pill">NEW INSTANCE</div><h2>Buat server demo</h2><p>Form ini menambah data ke tampilan browser, bukan membuat container VPS.</p><label>Nama server</label><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="contoh: bot-discord" required/><label>Runtime</label><select value={newRuntime} onChange={e=>setNewRuntime(e.target.value)}><option>Node.js</option><option>Python</option></select><button className="primary full" type="submit">Tambah server</button></form></div>}
  </main>;
}
function Stat({label,value,sub,icon}:{label:string,value:string,sub:string,icon:string}) { return <div className="stat-card"><div className="stat-top"><span>{label}</span><i>{icon}</i></div><strong>{value}</strong><small>{sub}</small><div className="stat-line"><span/></div></div> }
function ServerList({servers,toggleServer}:{servers:ServerItem[],toggleServer:(id:number,action:string)=>void}) {
  if (!servers.length) return <div className="empty">Tidak ada server yang cocok.</div>;
  return <div className="server-list">{servers.map(s=><div className="server-card" key={s.id}><div className="server-icon">▤</div><div className="server-info"><div className="server-title">{s.name}<span className={`status ${s.status.toLowerCase()}`}><i/> {s.status}</span></div><p>{s.runtime} <span>•</span> Expired: {s.expires}</p><div className="resource-row"><span>RAM <b>{s.ram}</b></span><span>CPU <b>{s.cpu}</b></span></div></div><div className="server-actions"><button onClick={()=>toggleServer(s.id,s.status==="ONLINE"?"Stop":"Start")}>{s.status==="ONLINE"?"■ Stop":"▶ Start"}</button><button onClick={()=>toggleServer(s.id,"Restart")}>↻ Restart</button></div></div>)}</div>
}
function PanelPlaceholder({title,desc}:{title:string,desc:string}) { return <div className="placeholder"><div className="placeholder-icon">◈</div><h2>{title}</h2><p>{desc}</p><span>BACKEND INTEGRATION REQUIRED</span></div> }
