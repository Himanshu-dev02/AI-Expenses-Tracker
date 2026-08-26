import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Receipt, TrendingUp, Mail, ShieldCheck, Zap, BarChart3,
  ArrowRight, Check, Star, Menu, X, Brain, Wallet,
  PieChart, Bell, Upload, ChevronDown, ExternalLink,
  Sparkles, Lock, Globe, Users, Eye, EyeOff
} from "lucide-react";

/* ─── Tiny hook: is element in viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── Animated counter ─── */
function Counter({ to, prefix = "", suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ─── Animated dashboard mockup ─── */
function DashboardMockup() {
  const [active, setActive] = useState(0);
  const tabs = ["Receipt AI", "Predictions"];
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 2), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
      {/* Window bar */}
      <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C840", display: "inline-block" }} />
        <span style={{ flex: 1, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>AI Expenses Tracker</span>
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", padding: "12px 16px 0", gap: 8 }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActive(i)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", transition: "all 0.3s", background: active === i ? "#5B6EF5" : "rgba(255,255,255,0.06)", color: active === i ? "#fff" : "rgba(255,255,255,0.5)" }}>{t}</button>
        ))}
      </div>
      {/* Content */}
      <div style={{ padding: 20, minHeight: 260 }}>
        {active === 0 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, background: "rgba(91,110,245,0.12)", border: "1px dashed rgba(91,110,245,0.4)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Upload size={24} color="#5B6EF5" />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Drop receipt here</span>
              </div>
              <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Merchant", "FreshMart Grocery"], ["Amount", "₹2,849"], ["Category", "Food"], ["Date", "Jul 14, 2026"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{k}</span>
                    <span style={{ fontSize: 11, color: "#10C986", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(16,201,134,0.1)", border: "1px solid rgba(16,201,134,0.3)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#10C986" }}>
              ✓ AI extracted all fields with high confidence
            </div>
          </div>
        )}
        {active === 1 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {[["Last Month", "₹18,400"], ["Predicted", "₹21,200"]].map(([l, v]) => (
                <div key={l} style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{l}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: l === "Predicted" ? "#A78BFA" : "#fff" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#F87171", fontWeight: 600, marginBottom: 2 }}>⚠ Overspending Alert</div>
              <div style={{ fontSize: 11, color: "rgba(248,113,113,0.8)" }}>You may exceed budget by ₹2,500 this month</div>
            </div>
            {[["Food", 78], ["Transport", 45], ["Shopping", 92]].map(([cat, pct]) => (
              <div key={cat} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{cat}</span>
                  <span style={{ fontSize: 11, color: "#A78BFA" }}>{pct}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#5B6EF5,#A78BFA)", borderRadius: 4, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

/* ─── Auth Modal ─── */
const API_URL = "https://ai-expenses-tracker-backend-3u7r.onrender.com";

function AuthModal({ mode, onClose, onSuccess }) {
  const [tab, setTab] = useState(mode); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // sync tab when parent changes mode
  useEffect(() => { setTab(mode); setError(""); }, [mode]);

  const persistAuth = (profile, token) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    if (token) storage.setItem("token", token);
    if (profile) storage.setItem("user", JSON.stringify(profile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (tab === "signup" && !name.trim()) { setError("Name is required"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const endpoint = tab === "login" ? "/api/user/login" : "/api/user/register";
      const body = tab === "login" ? { email, password } : { name, email, password };
      const res = await axios.post(`${API_URL}${endpoint}`, body);
      const data = res.data || {};
      const token = data.token ?? null;
      let profile = data.user ?? null;
      if (!profile && token) {
        try {
          const r = await axios.get(`${API_URL}/api/user/me`, { headers: { Authorization: `Bearer ${token}` } });
          profile = r.data;
        } catch { profile = { name, email }; }
      }
      if (!profile) profile = { name, email };
      persistAuth(profile, token);
      onSuccess(profile, token, rememberMe);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inp = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "11px 14px 11px 42px", color: "#fff", fontSize: 14, width: "100%", outline: "none" };
  const label = { fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 6, display: "block" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(5,14,31,0.85)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(145deg,#0A1628,#0D1F3C)", border: "1px solid rgba(91,110,245,0.3)", borderRadius: 24, padding: 36, width: "100%", maxWidth: 420, position: "relative", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}><X size={16} /></button>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, userSelect: "none" }}>
          <div style={{ width: 36, height: 36, aspectRatio: "1/1", borderRadius: 10, background: "linear-gradient(135deg,#5B6EF5,#A78BFA)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(91,110,245,0.3)" }}>
            <Wallet size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1, letterSpacing: "-0.3px" }}>TrackAI</span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 4, marginBottom: 28 }}>
          {["login", "signup"].map(t => (
            <button key={t} onClick={() => { setTab(t); setError(""); }} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.25s", background: tab === t ? "linear-gradient(135deg,#5B6EF5,#A78BFA)" : "transparent", color: tab === t ? "#fff" : "rgba(255,255,255,0.45)" }}>
              {t === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>{tab === "login" ? "Welcome back" : "Create account"}</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 24 }}>{tab === "login" ? "Sign in to your TrackAI account" : "Join TrackAI and start tracking smarter"}</p>

        {error && <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#F87171", marginBottom: 18 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {tab === "signup" && (
            <div style={{ marginBottom: 16, position: "relative" }}>
              <label style={label}>Full Name</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)" }}><Users size={16} /></div>
                <input style={inp} type="text" placeholder="Your Full Name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            </div>
          )}

          <div style={{ marginBottom: 16, position: "relative" }}>
            <label style={label}>Email Address</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)" }}><Mail size={16} /></div>
              <input style={inp} type="email" placeholder="your@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>

          <div style={{ marginBottom: 20, position: "relative" }}>
            <label style={label}>Password</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)" }}><Lock size={16} /></div>
              <input style={{ ...inp, paddingRight: 42 }} type={showPwd ? "text" : "password"} placeholder="••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPwd(p => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>{showPwd ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <input type="checkbox" id="rm" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} style={{ accentColor: "#5B6EF5", width: 15, height: 15 }} />
            <label htmlFor="rm" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>Remember me</label>
          </div>

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: loading ? "rgba(91,110,245,0.5)" : "linear-gradient(135deg,#5B6EF5,#A78BFA)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
            {loading ? "Please wait…" : tab === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          {tab === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setTab(tab === "login" ? "signup" : "login"); setError(""); }} style={{ background: "none", border: "none", color: "#5B6EF5", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
            {tab === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─── Section fade-in wrapper ─── */
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", ...style }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN LANDING PAGE
════════════════════════════════════════════ */
export default function LandingPage({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null); // null | "login" | "signup"

  const handleAuthSuccess = (profile, token, remember) => {
    if (onAuthSuccess) {
      onAuthSuccess(profile, token, remember);
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* ── shared style tokens ── */
  const S = {
    navy: "#050E1F",
    navyLight: "#0A1628",
    indigo: "#5B6EF5",
    emerald: "#10C986",
    purple: "#A78BFA",
    border: "rgba(255,255,255,0.08)",
    glass: "rgba(255,255,255,0.04)",
    textMuted: "rgba(255,255,255,0.45)",
  };

  const navLinks = ["Features", "AI Features", "How It Works", "Benefits"];

  return (
    <div style={{ background: S.navy, color: "#F8FAFC", fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        @keyframes gradMove { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        a { text-decoration:none; color:inherit; }
        button { cursor:pointer; font-family:inherit; }
        .gradient-text {
          background: linear-gradient(135deg, #5B6EF5 0%, #A78BFA 50%, #10C986 100%);
          background-size: 200% 200%;
          animation: gradMove 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-card:hover { transform:translateY(-4px); border-color:rgba(91,110,245,0.4) !important; box-shadow:0 20px 40px rgba(91,110,245,0.15) !important; }
        .glow-card { transition:transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .nav-link:hover { color:#fff !important; }
        .cta-primary:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(91,110,245,0.45) !important; }
        .cta-primary { transition:transform 0.2s ease, box-shadow 0.2s ease; }
        .cta-secondary:hover { background:rgba(255,255,255,0.08) !important; }
        .cta-secondary { transition:background 0.2s ease; }
        ::-webkit-scrollbar { width:6px; } 
        ::-webkit-scrollbar-track { background:#050E1F; }
        ::-webkit-scrollbar-thumb { background:#5B6EF5; border-radius:3px; }
        @media (max-width:768px) {
          .hero-grid { flex-direction:column !important; }
          .features-grid { grid-template-columns:1fr !important; }
          .ai-grid { grid-template-columns:1fr !important; }
          .steps-grid { grid-template-columns:1fr !important; }
          .benefits-grid { grid-template-columns:1fr !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
          .footer-grid { flex-direction:column !important; gap:32px !important; }
          .hero-title { font-size:clamp(2rem, 8vw, 3.5rem) !important; }
          .hide-mobile { display:none !important; }
        }
      `}</style>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s", background: scrolled ? "rgba(5,14,31,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${S.border}` : "none", padding: "0 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", height: 68, gap: 32 }}>
          {/* Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, cursor: "pointer", userSelect: "none" }}>
            <div style={{ width: 36, height: 36, aspectRatio: "1/1", borderRadius: 10, background: "linear-gradient(135deg,#5B6EF5,#A78BFA)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(91,110,245,0.3)" }}>
              <Wallet size={18} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1, letterSpacing: "-0.3px" }}>TrackAI</span>
          </div>

          {/* Nav links desktop */}
          <div className="hide-mobile" style={{ display: "flex", gap: 32, flex: 1 }}>
            {navLinks.map(l => (
              <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))} style={{ background: "none", border: "none", fontSize: 14, fontWeight: 500, color: S.textMuted, padding: 0 }}>{l}</button>
            ))}
          </div>

          {/* CTA */}
          <div className="hide-mobile" style={{ display: "flex", gap: 10 }}>
            <button className="cta-secondary" onClick={() => setModal("login")} style={{ padding: "9px 20px", borderRadius: 10, border: `1px solid ${S.border}`, background: "transparent", fontSize: 14, fontWeight: 500, color: "#fff" }}>Sign in</button>
            <button className="cta-primary" onClick={() => setModal("signup")} style={{ padding: "9px 20px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#5B6EF5,#A78BFA)", fontSize: 14, fontWeight: 600, color: "#fff" }}>Get Started Free</button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#fff", display: "none" }} className="hide-desktop" aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "rgba(5,14,31,0.98)", borderTop: `1px solid ${S.border}`, padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {navLinks.map(l => <button key={l} onClick={() => scrollTo(l.toLowerCase().replaceAll(" ", "-"))} style={{ background: "none", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, textAlign: "left" }}>{l}</button>)}
            <button className="cta-primary" onClick={() => { setModal("signup"); setMenuOpen(false); }} style={{ padding: "11px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#5B6EF5,#A78BFA)", fontSize: 14, fontWeight: 600, color: "#fff", marginTop: 8 }}>Get Started Free</button>
          </div>
        )}
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,110,245,0.18) 0%, transparent 70%)", top: -100, left: -200, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)", bottom: -100, right: -100, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 60 }}>
            {/* Left */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, border: `1px solid rgba(91,110,245,0.4)`, background: "rgba(91,110,245,0.1)", marginBottom: 24, fontSize: 13, fontWeight: 500, color: S.indigo }}>
                <Sparkles size={13} />
                Track Expenses Smartly
              </div>
              <h1 className="hero-title gradient-text" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5vw,4rem)", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 24 }}>
                Your Money,<br />Managed by AI
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: S.textMuted, marginBottom: 36, maxWidth: 480 }}>
                Scan receipts in seconds. Predict next month's spend. TrackAI turns financial chaos into clarity.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="cta-primary" onClick={() => setModal("signup")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#5B6EF5,#A78BFA)", fontSize: 15, fontWeight: 600, color: "#fff", boxShadow: "0 8px 24px rgba(91,110,245,0.35)" }}>
                  Start Tracking Free <ArrowRight size={16} />
                </button>
                <button className="cta-secondary" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, border: `1px solid ${S.border}`, background: "transparent", fontSize: 15, fontWeight: 500, color: "#fff" }}>
                  <ExternalLink size={16} /> View on GitHub
                </button>
              </div>
              {/* Social proof */}




            </div>
            {/* Right — live mockup */}
            <div style={{ flex: 1, animation: "float 5s ease-in-out infinite" }}>
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>



      {/* ══════════════════ FEATURES ══════════════════ */}
      <section id="features" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: "rgba(16,201,134,0.1)", border: "1px solid rgba(16,201,134,0.3)", fontSize: 12, fontWeight: 600, color: S.emerald, marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>Features</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-1px", marginBottom: 16 }}>Everything you need to <span className="gradient-text">master your finances</span></h2>
              <p style={{ color: S.textMuted, fontSize: 16, maxWidth: 520, margin: "0 auto" }}></p>
            </div>
          </FadeIn>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { icon: <Receipt size={22} color="#5B6EF5" />, color: "#5B6EF5", title: "Smart Receipt Scanner", desc: "Upload any receipt photo and Gemini Vision extracts amount, date, merchant and category automatically." },
              { icon: <TrendingUp size={22} color="#A78BFA" />, color: "#A78BFA", title: "Spending Predictions", desc: "AI analyses 6 months of history and forecasts next month's spending per category with reasoning." },

              { icon: <Bell size={22} color="#F59E0B" />, color: "#F59E0B", title: "Overspending Alerts", desc: "Set a monthly budget. Get an instant alert when AI predicts you'll go over before the month ends." },
              { icon: <BarChart3 size={22} color="#EF4444" />, color: "#EF4444", title: "Visual Dashboard", desc: "Pie charts, gauge cards and trend graphs give you a full picture of where your money goes." },
              { icon: <ShieldCheck size={22} color="#3B82F6" />, color: "#3B82F6", title: "Secure by Default", desc: "JWT authentication, encrypted tokens, and OAuth 2.0 — your financial data stays private." },
            ].map(({ icon, color, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="glow-card" style={{ padding: 28, borderRadius: 16, background: S.glass, border: `1px solid ${S.border}`, height: "100%" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>{icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{title}</h3>
                  <p style={{ color: S.textMuted, fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ AI FEATURES ══════════════════ */}
      <section id="ai-features" style={{ padding: "100px 24px", background: S.navyLight }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", fontSize: 12, fontWeight: 600, color: S.purple, marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>AI Features</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-1px", marginBottom: 16 }}>AI features that <span className="gradient-text"> help you track expenses smartly</span></h2>
            </div>
          </FadeIn>
          <div className="ai-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
            {[
              {
                badge: "Receipt Scanner AI", badgeColor: "#5B6EF5", icon: <Receipt size={28} color="#5B6EF5" />,
                title: "Receipt Scanner",
                points: ["Camera or gallery upload", "Extracts 5 fields instantly", "Editable before saving", "Handles blurry photos"],
              },
              {
                badge: "Prediction AI", badgeColor: "#A78BFA", icon: <Brain size={28} color="#A78BFA" />,
                title: "Spend Predictor",
                points: ["6-month historical analysis", "Per-category forecasts", "Trend + confidence score", "Budget breach alert"],
                featured: true,
              },

            ].map(({ badge, badgeColor, icon, title, tag, points, featured }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div style={{ borderRadius: 20, border: `1px solid ${featured ? badgeColor + "50" : S.border}`, background: featured ? `linear-gradient(145deg, rgba(167,139,250,0.08), rgba(91,110,245,0.05))` : S.glass, padding: 32, position: "relative", height: "100%" }}>
                  {featured && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#5B6EF5,#A78BFA)", padding: "4px 16px", borderRadius: "0 0 10px 10px", fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}></div>}
                  <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, background: `${badgeColor}18`, border: `1px solid ${badgeColor}40`, fontSize: 11, fontWeight: 600, color: badgeColor, marginBottom: 20 }}>{badge}</div>
                  <div style={{ marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>{title}</h3>
                  <div style={{ fontSize: 11, color: S.textMuted, marginBottom: 20, fontFamily: "monospace", background: "rgba(255,255,255,0.04)", padding: "4px 10px", borderRadius: 6, display: "inline-block" }}>{tag}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {points.map(p => (
                      <div key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${badgeColor}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check size={10} color={badgeColor} />
                        </div>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ DASHBOARD PREVIEW ══════════════════ */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: "rgba(91,110,245,0.1)", border: "1px solid rgba(91,110,245,0.3)", fontSize: 12, fontWeight: 600, color: S.indigo, marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>Live Preview</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-1px", marginBottom: 16 }}>See the AI features <span className="gradient-text">in action</span></h2>
            <p style={{ color: S.textMuted, fontSize: 16, maxWidth: 480, margin: "0 auto 48px" }}>Switch between the two AI panels to see exactly what gets built.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <DashboardMockup />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section id="how-it-works" style={{ padding: "100px 24px", background: S.navyLight }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: "rgba(16,201,134,0.1)", border: "1px solid rgba(16,201,134,0.3)", fontSize: 12, fontWeight: 600, color: S.emerald, marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>How It Works</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-1px" }}>Up and running <span className="gradient-text">in minutes</span></h2>
            </div>
          </FadeIn>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, position: "relative" }}>
            {[
              { step: "01", icon: <Users size={22} color="#5B6EF5" />, title: "Create Account", desc: "Sign up with email and password. JWT tokens keep you secure across sessions." },
              { step: "02", icon: <Upload size={22} color="#A78BFA" />, title: "Scan a Receipt", desc: "Upload any receipt photo. AI reads it and fills the form instantly." },

              { step: "03", icon: <TrendingUp size={22} color="#F59E0B" />, title: "See Predictions", desc: "AI forecasts next month's spend and alerts you before you overshoot." },
            ].map(({ step, icon, title, desc }, i) => (
              <FadeIn key={step} delay={i * 0.1}>
                <div style={{ textAlign: "center", padding: "32px 20px", borderRadius: 16, background: S.glass, border: `1px solid ${S.border}`, height: "100%" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 48, color: "rgba(255,255,255,0.04)", lineHeight: 1, marginBottom: 16 }}>{step}</div>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{title}</h3>
                  <p style={{ color: S.textMuted, fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ BENEFITS ══════════════════ */}
      <section id="benefits" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", fontSize: 12, fontWeight: 600, color: S.purple, marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>Why TrackAI</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-1px" }}>Built to <span className="gradient-text">impress and perform</span></h2>
            </div>
          </FadeIn>
          <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {[
              { icon: <Zap size={20} color="#F59E0B" />, color: "#F59E0B", title: "Zero Manual Entry", desc: "Receipt scanner . You spend less time on bookkeeping, more on living." },
              { icon: <Brain size={20} color="#A78BFA" />, color: "#A78BFA", title: "Genuinely Predictive", desc: "Not just charts of the past —  AI tells you where you're headed and exactly why, category by category." },
              { icon: <Lock size={20} color="#5B6EF5" />, color: "#5B6EF5", title: "Production-Grade Security", desc: "JWT auth, bcrypt password hashing, OAuth 2.0 token refresh — security you can talk about in interviews." },
            ].map(({ icon, color, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="glow-card" style={{ display: "flex", gap: 20, padding: 28, borderRadius: 16, background: S.glass, border: `1px solid ${S.border}` }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{title}</h3>
                    <p style={{ color: S.textMuted, fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA banner */}
          <FadeIn delay={0.2}>
            <div style={{ marginTop: 60, padding: "48px 40px", borderRadius: 24, background: "linear-gradient(135deg, rgba(91,110,245,0.15), rgba(167,139,250,0.1))", border: "1px solid rgba(91,110,245,0.25)", textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-1px", marginBottom: 12 }}>Ready to track smarter?</h2>
              <p style={{ color: S.textMuted, marginBottom: 28, fontSize: 16 }}>Free, open source, and built to stand out in your portfolio.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="cta-primary" onClick={() => setModal("signup")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#5B6EF5,#A78BFA)", fontSize: 15, fontWeight: 600, color: "#fff", boxShadow: "0 8px 24px rgba(91,110,245,0.35)" }}>
                  Get Started — It's Free <ArrowRight size={16} />
                </button>
                <button className="cta-secondary" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, border: `1px solid ${S.border}`, background: "transparent", fontSize: 15, fontWeight: 500, color: "#fff" }}>
                  <ExternalLink size={16} /> Star on GitHub
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ borderTop: `1px solid ${S.border}`, padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "flex", justifyContent: "space-between", marginBottom: 48 }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, userSelect: "none" }}>
                <div style={{ width: 34, height: 34, aspectRatio: "1/1", borderRadius: 10, background: "linear-gradient(135deg,#5B6EF5,#A78BFA)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(91,110,245,0.2)" }}>
                  <Wallet size={16} color="#fff" />
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, lineHeight: 1, letterSpacing: "-0.3px" }}>TrackAI</span>
              </div>
              <p style={{ color: S.textMuted, fontSize: 13, lineHeight: 1.7 }}>AI-powered expense tracking</p>
              
            </div>
            {[
              { title: "Features", links: ["Receipt Scanner", "Spend Predictor", "Overspending Alert"] },
              { title: "Project", links: ["GitHub Repo", "Documentation", "Portfolio", "Contact"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16, color: "#fff" }}>{title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {links.map(l => <a key={l} href="#" style={{ fontSize: 13, color: S.textMuted, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = S.textMuted}>{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: S.textMuted }}>©2026 TrackAI. All rights reserved. </span>
            <span style={{ fontSize: 13, color: S.textMuted }}>Made with ❤️</span>
          </div>
        </div>
      </footer>
      {modal && <AuthModal mode={modal} onClose={() => setModal(null)} onSuccess={handleAuthSuccess} />}
    </div>
  );
}