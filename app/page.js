"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Placeholder auth: replace the submit handler with your backend (Firebase, Supabase, etc.)
export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    if (!form.username || !form.password || (mode === "signup" && !form.name)) {
      setError("Fill in all fields to continue.");
      return;
    }
    localStorage.setItem("bg-user", form.name || form.username);
    router.push("/home");
  }

  return (
    <main className="auth">
      <section className="auth-logo">
        <img src="/logo.png" alt="Basic Growth: Build Strength. Grow Better." />
      </section>
      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit} noValidate>
          <div className="tabs" role="tablist">
            <button type="button" role="tab" className="tab" aria-selected={mode === "signin"} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button>
            <button type="button" role="tab" className="tab" aria-selected={mode === "signup"} onClick={() => { setMode("signup"); setError(""); }}>Sign up</button>
          </div>
          {mode === "signup" && (
            <input className="field" placeholder="Name" value={form.name} onChange={set("name")} autoComplete="name" />
          )}
          <input className="field" placeholder="Username" value={form.username} onChange={set("username")} autoComplete="username" />
          <input className="field" type="password" placeholder="Password" value={form.password} onChange={set("password")} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          <p className="error" role="alert">{error}</p>
          <button className="btn-primary" type="submit">{mode === "signin" ? "Log in" : "Create account"}</button>
        </form>
      </section>
    </main>
  );
}
