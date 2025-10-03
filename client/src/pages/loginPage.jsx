
import {useState } from "react";

export function LoginPage(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setMessage("Signed in successfully. Welcome!");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-gradient-to-br from-brand/15 via-transparent to-transparent px-4">
      <div className="w-full max-w-md">
        <div className="relative bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 border border-border rounded-2xl shadow-xl">
          {/* Avatar at top of the card */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          </div>

          <div className=" py-4 px-6 sm:px-8">
            <div className="text-center space-y-2">
            <div className="w-full   ring-background  overflow-hidden bg-gradient-to-br from-brand to-brand/70 flex items-center justify-center">
              <img
                src="logo.jpeg"
                alt="Profile"
                className="size-28 object-cover rounded-full"
              />
            </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Login in to continue</p>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-2">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-brand focus:ring-offset-2 transition placeholder:text-muted-foreground/70"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-brand focus:ring-offset-2 transition placeholder:text-muted-foreground/70"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="roll" className="block text-sm font-medium">Roll Number</label>
                <input
                  id="roll"
                  name="roll"
                  type="text"
                  inputMode="numeric"
                  required
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  className="block w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-brand focus:ring-offset-2 transition placeholder:text-muted-foreground/70"
                  placeholder="e.g. 07,  23"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex text-white items-center justify-center rounded-xl bg-[#2537ff] bg-brand text-brand-foreground px-4 py-3 text-sm font-semibold shadow-lg shadow-brand/20 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ring-offset-background transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Logging in…" : "Login"}
              </button>

              {message && (
                <p className="text-center text-sm text-muted-foreground">{message}</p>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}


