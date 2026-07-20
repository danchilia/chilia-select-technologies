"use client";

import { useState } from "react";
import { Menu, X, MapPin, Clock, Phone, Star } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa6";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reservations", href: "#reserve" },
  { label: "Contact", href: "#contact" },
];

const MENU_ITEMS = [
  { category: "Starter", name: "Charred Octopus", description: "Smoked paprika, white bean puree, citrus oil", price: "$18" },
  { category: "Starter", name: "Harbor Oysters", description: "Half dozen, mignonette, fresh lemon", price: "$22" },
  { category: "Main", name: "Pan-Seared Halibut", description: "Saffron risotto, charred fennel, brown butter", price: "$38" },
  { category: "Main", name: "Dry-Aged Ribeye", description: "Roasted bone marrow, market greens, red wine jus", price: "$46" },
  { category: "Main", name: "Wild Mushroom Risotto", description: "Aged parmesan, black truffle, herb oil", price: "$29" },
  { category: "Dessert", name: "Salted Caramel Tart", description: "Sea salt, brown butter crumble, crème fraîche", price: "$14" },
];

const TIME_SLOTS = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];

export default function CoastalTableDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0d10] font-sans text-[#f2ede2] antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0d10]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-serif text-xl tracking-wide text-[#f2ede2]">
            Coastal <span className="text-[#c9a24b]">Table</span>
          </span>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-[#cfc7b6] transition-colors hover:text-[#c9a24b]">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#reserve"
            className="hidden rounded-full bg-[#c9a24b] px-5 py-2 text-sm font-semibold text-[#0b0d10] transition-transform hover:scale-105 md:inline-block"
          >
            Reserve a Table
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-[#f2ede2] md:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#cfc7b6]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reserve"
              onClick={() => setMenuOpen(false)}
              className="mt-2 w-fit rounded-full bg-[#c9a24b] px-5 py-2 text-sm font-semibold text-[#0b0d10]"
            >
              Reserve a Table
            </a>
          </div>
        ) : null}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-28 sm:py-36">
        <div className="pointer-events-none absolute left-1/2 top-0 h-130 w-130 -translate-x-1/2 rounded-full bg-[#c9a24b]/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a24b]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#c9a24b]">
            Fine Dining · Est. 2015
          </span>

          <h1 className="mt-8 font-serif text-5xl leading-[1.1] tracking-tight sm:text-6xl">
            Seasonal coastal cuisine, <br className="hidden sm:block" />
            overlooking the harbor.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance leading-relaxed text-[#cfc7b6]">
            An intimate dining room built around the day&apos;s catch, locally-grown produce,
            and a wine list chosen to match the view.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#reserve"
              className="w-full rounded-full bg-[#c9a24b] px-7 py-3 text-sm font-semibold text-[#0b0d10] transition-transform hover:scale-105 sm:w-auto"
            >
              Reserve a Table
            </a>
            <a
              href="#menu"
              className="w-full rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-[#f2ede2] transition-colors hover:border-[#c9a24b] sm:w-auto"
            >
              View Menu
            </a>
          </div>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <Stat value="4.9" label="Guest Rating" icon={<Star className="h-4 w-4 text-[#c9a24b]" />} />
            <Stat value="Tue–Sun" label="Open Weekly" icon={<Clock className="h-4 w-4 text-[#c9a24b]" />} />
            <Stat value="Harbor" label="Waterfront View" icon={<MapPin className="h-4 w-4 text-[#c9a24b]" />} />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#c9a24b]/20 via-[#1a1d22] to-[#0b0d10]">
            <div className="absolute inset-6 flex flex-col justify-end rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
              <p className="font-serif text-lg italic text-[#f2ede2]">
                &ldquo;Every plate should taste like the coast it came from.&rdquo;
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-[#c9a24b]">Executive Chef, Coastal Table</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c9a24b]">Our Story</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Ten years of honest, seasonal cooking by the water.
            </h2>
            <p className="mt-5 leading-relaxed text-[#cfc7b6]">
              Coastal Table opened with a simple idea: source what&apos;s fresh, cook it
              simply, and let the harbor views do the rest. Our menu changes with the
              seasons, our wine list is chosen by hand, and every table is set for a slow,
              memorable evening.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-[#cfc7b6]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24b]" /> Locally sourced daily
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24b]" /> Seasonal tasting menu
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24b]" /> Curated wine pairings
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24b]" /> Private harbor terrace
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="border-t border-white/10 bg-[#101318] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c9a24b]">The Menu</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">A taste of the season</h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-[#0b0d10] p-6 transition-colors hover:border-[#c9a24b]/40"
              >
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#c9a24b]">
                  {item.category}
                </span>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg leading-snug">{item.name}</h3>
                  <span className="shrink-0 font-serif text-lg text-[#c9a24b]">{item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#cfc7b6]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section id="reserve" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c9a24b]">Reservations</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Request your table
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-[#cfc7b6]">
              Tell us when you&apos;d like to visit and we&apos;ll confirm your reservation
              by email within a few hours. For parties larger than eight, please call us
              directly.
            </p>

            <div className="mt-8 flex flex-col gap-4 text-sm text-[#cfc7b6]">
              <span className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[#c9a24b]" /> Tue–Sun, 5:00 PM – 10:00 PM
              </span>
              <span className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#c9a24b]" /> (555) 019-2847
              </span>
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#c9a24b]" /> 12 Harbor Row, Bayport
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101318] p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a24b]/15">
                  <Star className="h-5 w-5 text-[#c9a24b]" />
                </span>
                <h3 className="font-serif text-xl">Request received</h3>
                <p className="max-w-xs text-sm text-[#cfc7b6]">
                  Thank you — we&apos;ll confirm your table by email shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Name">
                    <input required type="text" className={inputClass} placeholder="Jane Doe" />
                  </Field>
                  <Field label="Guests">
                    <select required className={inputClass} defaultValue="">
                      <option value="" disabled>Select</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Email">
                  <input required type="email" className={inputClass} placeholder="jane@email.com" />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Date">
                    <input required type="date" className={inputClass} />
                  </Field>
                  <Field label="Time">
                    <select required className={inputClass} defaultValue="">
                      <option value="" disabled>Select</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-[#c9a24b] py-3 text-sm font-semibold text-[#0b0d10] transition-transform hover:scale-[1.02]"
                >
                  Request Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <span className="font-serif text-lg tracking-wide">
            Coastal <span className="text-[#c9a24b]">Table</span>
          </span>
          <p className="max-w-sm text-sm text-[#cfc7b6]">
            12 Harbor Row, Bayport &middot; (555) 019-2847 &middot; hello@coastaltable.example
          </p>
          <div className="flex items-center gap-4">
            <FaInstagram className="h-4 w-4 text-[#cfc7b6] transition-colors hover:text-[#c9a24b]" />
            <FaFacebook className="h-4 w-4 text-[#cfc7b6] transition-colors hover:text-[#c9a24b]" />
          </div>
          <div className="mt-4 flex flex-col items-center gap-1 border-t border-white/10 pt-6 text-xs text-[#6b6558]">
            <span>&copy; 2026 Coastal Table. All rights reserved.</span>
            <span>Design concept by Chilia Select Technologies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-[#0b0d10] px-4 py-2.5 text-sm text-[#f2ede2] placeholder:text-[#6b6558] focus:border-[#c9a24b] focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-[#cfc7b6]">
      {label}
      {children}
    </label>
  );
}

function Stat({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="flex items-center gap-1.5 font-serif text-lg text-[#f2ede2]">
        {icon}
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-wider text-[#6b6558]">{label}</span>
    </div>
  );
}
