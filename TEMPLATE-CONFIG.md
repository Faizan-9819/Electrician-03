# Template Globalization Guide

`settings.ts` at the project root holds every switch that differs between clones of this template:
whether the forms talk to a backend, which languages the site ships, which one is the main language,
whether the language switcher is shown, and what each language's URL is.

Cloning a site should mean editing **one file**. This guide covers that file, how it is wired in
this repo, and how to put the same system into another Next.js (App Router) template.

> Everything below was verified against this repo on 2026-09-22: Next.js 16.3.3 (App Router,
> Turbopack), React 19.2.8, `@/*` → project root. This is the **Tij electrician** clone; the
> tenant slug on the API is `tij`.

---

## 1. The settings

The complete contents of `settings.ts`, at their current values:

```ts
export type Language = "en" | "nl";

export const BACKEND_ENABLED: boolean = false;
export const API_BASE_URL: string = "https://api.getgrowthrocket.com/api/v1/public";

export const EN_ENABLED: boolean = true;
export const NL_ENABLED: boolean = false;

export const DEFAULT_LANGUAGE: Language = "en";
export const SHOW_LANGUAGE_TOGGLE: boolean = true;

export const EN_URL: string = "/";
export const NL_URL: string = "/nl";
```

| Setting | Values | What it does |
| --- | --- | --- |
| `BACKEND_ENABLED` | `true` / `false` | Master switch for every API call. `false` = no request ever reaches the API. |
| `API_BASE_URL` | URL string | The API root, no trailing slash. Required when `BACKEND_ENABLED` is `true`, ignored completely when `false`. |
| `EN_ENABLED` | `true` / `false` | Turns English on or off. When off, `/en` redirects to `/`. |
| `NL_ENABLED` | `true` / `false` | Turns Dutch on or off. When off, `/nl` redirects to `/`. |
| `DEFAULT_LANGUAGE` | `"en"` / `"nl"` | The main language: served from `/`, and used for `<html lang>`. |
| `SHOW_LANGUAGE_TOGGLE` | `true` / `false` | Shows/hides the EN/NL switcher. Ignored on a single-language site. |
| `EN_URL` | `"/"` or `"/en"` | The URL English is served from. Only used when both languages are on. |
| `NL_URL` | `"/"` or `"/nl"` | The URL Dutch is served from. Only used when both languages are on. |

**This clone right now:** setup 1 — English only, Dutch switched off, backend disconnected. The Dutch
copy is still in the code — it is unreachable, not deleted, and comes back the moment `NL_ENABLED`
is set to `true`. `SHOW_LANGUAGE_TOGGLE` is left `true` but is inert on a single-language site, so
turning `NL_ENABLED` on is the only edit needed to reach setup 4.

### The four client setups

| # | Client wants | `EN_ENABLED` | `NL_ENABLED` | `DEFAULT_LANGUAGE` | `EN_URL` | `NL_URL` | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | English only | `true` | `false` | `"en"` | — | — | `/` English; `/en` and `/nl` send you to `/` |
| 2 | Dutch only | `false` | `true` | `"nl"` | — | — | `/` Dutch; `/en` and `/nl` send you to `/` |
| 3 | Both, Dutch on the domain | `true` | `true` | `"nl"` | `"/en"` | `"/"` | `/` Dutch, `/en` English, `/nl` → `/` |
| 4 | Both, English on the domain | `true` | `true` | `"en"` | `"/"` | `"/nl"` | `/` English, `/nl` Dutch, `/en` → `/` |

On a single-language site the `*_URL` settings are ignored: the remaining language is always served
from `/`, the switched-off language's route redirects there, and the switcher never renders even if
`SHOW_LANGUAGE_TOGGLE` is left `true`. Because no translations are deleted, moving a client between
any two of these setups is purely a settings edit.

All four were driven in a real browser against this repo; the observed results are in §6.

---

## 2. Backend on / off

### `BACKEND_ENABLED = false` — fully static

No request reaches the API. Specifically:

| Behaviour | What happens instead |
| --- | --- |
| Enquiry form's service dropdown | Filled from `STATIC_SERVICES` (`components/shared/LeadEnquiryForm.tsx:36`), passed through `withoutConsultation()` (`:42`) |
| Enquiry form submit | Validates locally, then shows the thank-you ("Message Sent!" / "Bericht verzonden!"). Nothing is sent. |
| Booking modal's service list | Filled from `STATIC_SERVICES` (`components/shared/BookingForm.tsx:66`), plus `STATIC_SETTINGS` (`:56`) for timezone, slot interval, minimum notice and booking window |
| Booking modal's date/time slots | Built in the browser by `generateSlotsByDate()` (`components/shared/BookingForm.tsx:95`) — a fixed 09:00–17:00 grid honouring the interval and minimum-notice values |
| Booking modal submit | Jumps straight to the success step. Nothing is sent. |

The forms keep their loading and error UI; it simply never triggers, because there is nothing to
wait for and nothing that can fail.

> **"Static" means no API traffic, not an offline page.** `next/font/google` fonts are inlined at
> build time, and the section components load their photography from `public/`. The backend switch
> governs `lib/api.ts` callers only.

### `BACKEND_ENABLED = true` — live

Set `API_BASE_URL` to the API root (no trailing slash). The same forms then fetch their service
lists and POST their submissions. No other file changes.

Endpoints used, all built with `apiUrl(...)`:

| Call | Endpoint | Used by |
| --- | --- | --- |
| Service list | `GET {API_BASE_URL}/bookings/settings` | both forms |
| Available slots | `GET {API_BASE_URL}/bookings/slots?serviceId=…&from=…&to=…` | booking modal |
| Booking | `POST {API_BASE_URL}/bookings` | booking modal |
| Enquiry | `POST {API_BASE_URL}/enquiries` | enquiry form |

`isBackendEnabled()` returns true only when the switch is on **and** `API_BASE_URL` is non-empty, so
half-filled settings can never fire requests at a bad URL. Both halves of that were confirmed in the
browser — see §6.

### Capturing the static service list

When turning a live site static, snapshot the real services once and paste them into the
`STATIC_SERVICES` constant in each form:

```bash
curl -s "https://api.getgrowthrocket.com/api/v1/public/bookings/settings" | jq '.services'
```

**This API resolves its tenant from the request host**, so the bare URL returns `404` from a
terminal:

```json
{"message":"Active published site not found for this host","error":"Not Found","statusCode":404}
```

Use the tenant-scoped route instead. For this site the tenant and site slugs are both `tij`:

```bash
curl -s "https://api.getgrowthrocket.com/api/v1/public/tenants/tij/sites/tij/bookings/settings" | jq '.services'
```

That returns `200` (tenant id 26, site id 16) with the two services currently published:

| `id` | `name` | `slug` | `durationMinutes` | `priceMinor` | `currencyCode` | `isConsultation` |
| --- | --- | --- | --- | --- | --- | --- |
| 103 | Lighting Installation | `lighting-installation` | 30 | `null` | `null` | `false` |
| 104 | Consultation | `consultation` | 15 | `0` | `null` | `true` |

…alongside the settings block that `STATIC_SETTINGS` mirrors: `timezone: "Europe/Amsterdam"`,
`slotIntervalMinutes: 30`, `minNoticeMinutes: 60`, `maxAdvanceDays: 30`, both buffers `0`,
`isActive: true`.

The `STATIC_SERVICES` and `STATIC_SETTINGS` constants in this repo match that response exactly.

---

## 3. Language settings in detail

### `EN_ENABLED` / `NL_ENABLED`

Turn each language on or off. Switching one off makes the site single-language: the remaining
language is served from `/`, and the switched-off language's URL **redirects to `/` rather than
404ing**, so old links and stray bookmarks still land somewhere sensible. The redirect is a `307`.

The switched-off language's copy stays in the components — unreachable, not deleted.

If both are set to `false`, `DEFAULT_LANGUAGE` is used on its own, so a slip in the settings can't
leave the site with no language at all.

### `DEFAULT_LANGUAGE`

The main language: the one served from `/`, and the value of `<html lang>` in `app/layout.tsx`. If
it points at a switched-off language, the enabled one wins instead, so a mismatched pair can't break
the site.

`<html lang>` is set twice on purpose: `app/layout.tsx` renders it from `defaultLanguage()` so the
server-sent HTML is correct, and `LanguageProvider` updates `document.documentElement.lang` on the
client so it follows the switcher without a full reload.

`DEFAULT_LANGUAGE` also picks the `<head>` copy: `app/layout.tsx` takes its `metadata` from
`metadataForLanguage(defaultLanguage())`, and `app/page.tsx` from whichever language owns `/`.

### `SHOW_LANGUAGE_TOGGLE`

`false` hides the EN/NL switcher in both places it appears in `components/shared/Navbar.tsx` — the
desktop action bar and the mobile header. (Unlike some other clones of this template, the mobile
drawer here has no switcher of its own.) The site simply stays in whichever language the URL
resolves to.

It is ignored entirely on a single-language site, since there would be nothing to switch to.

Hiding the switcher does **not** remove translations. On a bilingual site the other language is
still served at its own URL; visitors just have no button for it.

### `EN_URL` / `NL_URL` — the language URLs

On a bilingual site, set each language's URL directly. One of them normally takes `"/"`, the other
its own prefix.

| `EN_URL` | `NL_URL` | `/` | `/en` | `/nl` |
| --- | --- | --- | --- | --- |
| `"/"` | `"/nl"` | English | → redirects to `/` | Dutch |
| `"/en"` | `"/"` | Dutch | English | → redirects to `/` |
| `"/en"` | `"/nl"` | → redirects to `DEFAULT_LANGUAGE`'s URL | English | Dutch |

Allowed values are `"/"` or `"/en"` for English and `"/"` or `"/nl"` for Dutch — those are the routes
that exist on disk. Whichever language sits at `/` gives up its prefixed URL, so every language keeps
exactly one canonical address and search engines never see the same page twice.

---

## 4. How it is wired

Settings live in one file; the small amount of logic that reads them lives in `lib/`. No component
reads a setting to make a routing decision on its own.

| File | Reads | Purpose |
| --- | --- | --- |
| `settings.ts` | — | The switches. Values only, no logic. |
| `lib/api.ts` | `BACKEND_ENABLED`, `API_BASE_URL` | `isBackendEnabled()`, `apiUrl()`. |
| `lib/i18n.ts` | `EN_ENABLED`, `NL_ENABLED`, `DEFAULT_LANGUAGE`, `EN_URL`, `NL_URL` | All language/URL resolution. |
| `lib/metadata.ts` | — | Per-language `title`/`description`, so the three routes can't drift apart. |
| `app/layout.tsx` | `lib/i18n`, `lib/metadata` | Sets `<html lang>` and the fallback `metadata` from `defaultLanguage()`. |
| `app/page.tsx` | `lib/i18n`, `lib/metadata` | Renders the site, or redirects to the main language when no language owns `/`. |
| `app/en/page.tsx` | `lib/i18n`, `lib/metadata` | Renders English, or redirects when English is off or lives on `/`. |
| `app/nl/page.tsx` | `lib/i18n`, `lib/metadata` | Renders Dutch, or redirects when Dutch is off or lives on `/`. |
| `components/HomeContent.tsx` | — | The page body, shared by all three routes. |
| `components/shared/LanguageProvider.tsx` | `lib/i18n` | Derives the active language from the URL; navigates on switch. |
| `components/shared/Navbar.tsx` | `SHOW_LANGUAGE_TOGGLE`, `lib/i18n` | Shows/hides the switcher (2 places). |
| `components/shared/LeadEnquiryForm.tsx` | `lib/api` | Static vs live services; thank-you vs POST. |
| `components/shared/BookingForm.tsx` | `lib/api` | Static vs live services, slots and booking submission. |

```ts
// lib/api.ts
isBackendEnabled(): boolean            // switch is on AND a URL is set
apiUrl(path): string                   // joins a path onto API_BASE_URL

// lib/i18n.ts
enabledLanguages(): Language[]         // the languages switched on
isLanguageEnabled(lang): boolean       // is that language shipped at all
isMultiLanguage(): boolean             // are both of them on
defaultLanguage(): Language            // DEFAULT_LANGUAGE, corrected if it is switched off
pathForLanguage(lang): string          // that language's URL ("/" on a single-language site)
rootLanguage(): Language | null        // which language owns "/", if any
languageFromPathname(path): Language   // reads the language back out of a URL

// lib/metadata.ts
metadataForLanguage(lang): Metadata    // that language's <head> title/description
```

`LanguageProvider` exposes `{ language, setLanguage }` through `useLanguage()`, which 13 components
import. Per-language copy is **not** centralised beyond `lib/metadata.ts`: each component keeps its
own bilingual strings. `Navbar.tsx` and the section components use a `COPY`/`CONTENT` map keyed by
language, while `LeadEnquiryForm.tsx` and `BookingForm.tsx` use an inline `t({ en, nl })` helper.
Adding a language means touching each of those.

---

## 5. Porting this to another template

1. **Copy `settings.ts`, `lib/api.ts` and `lib/i18n.ts`** into the new project. Adjust the `Language`
   union and the matching `*_ENABLED` / `*_URL` pairs if the site ships different languages. Confirm
   `@/*` maps to the project root in `tsconfig.json`.

2. **Split the page body out of the route.** Move whatever `app/page.tsx` renders into a shared
   component (here: `components/HomeContent.tsx`), so several routes can share one body.

3. **Create one route per language**, plus the root route. A language route is four lines:

   ```tsx
   import { redirect } from "next/navigation";
   import HomeContent from "@/components/HomeContent";
   import { defaultLanguage, isLanguageEnabled, pathForLanguage } from "@/lib/i18n";

   export default function DutchPage() {
     if (!isLanguageEnabled("nl")) redirect(pathForLanguage(defaultLanguage()));

     const url = pathForLanguage("nl");
     if (url !== "/nl") redirect(url);

     return <HomeContent />;
   }
   ```

   The root route instead redirects when nothing claims `/`:

   ```tsx
   export default function RootPage() {
     if (!rootLanguage()) redirect(pathForLanguage(defaultLanguage()));
     return <HomeContent />;
   }
   ```

   If the clone's `app/en/page.tsx` is a re-export (`export { default } from "../page"`), replace it —
   a re-export renders the same page with no redirect and no language of its own.

4. **Point the language provider at the helpers.** Derive the active language with
   `languageFromPathname(pathname)` — on render, not in an effect — and navigate with
   `pathForLanguage(next)`. Delete any hardcoded `"/nl"` / `"/"` parsing and any `useState` mirror of
   the URL. Keep the provider's existing exported names so its consumers don't have to change.

5. **Gate the switcher** with `SHOW_LANGUAGE_TOGGLE && isMultiLanguage()`, in every place the
   switcher appears (this template has two).

6. **Gate every fetch.** Route all API URLs through `apiUrl(...)` and give each call an
   `isBackendEnabled()` early return that uses static data instead:

   ```ts
   if (!isBackendEnabled()) {
     setServices(STATIC_SERVICES);
     return;
   }
   ```

   In submit handlers the static branch shows the success state and returns before the POST.

7. **Set `<html lang>`** from `defaultLanguage()` in `app/layout.tsx`, and route per-route `metadata`
   through a per-language map if the clone's routes carry their own titles.

---

## 6. Verifying a clone

```bash
npx tsc --noEmit -p .   # types
npx next build          # routes and redirects compile
npx eslint app components lib settings.ts
```

`tsc` passes clean, `next build` prerenders `/`, `/en` and `/nl` as static routes, and `eslint`
reports only the three pre-existing `no-explicit-any` errors in `components/shared/Button.tsx`.

Then load the running site and check it against the setup table in §1. Flipping the settings
temporarily is the fastest way to confirm all four setups behave — just restore the client's values
afterwards.

### What this repo actually did, in headless Chrome against `next dev`

Routes, for each setup (`->` is where the URL landed after redirects):

| Setup | `/` | `/en` | `/nl` | `<html lang>` on `/` | copy on `/` | switchers in DOM |
| --- | --- | --- | --- | --- | --- | --- |
| 1 English only | `/` | → `/` (307) | → `/` (307) | `en` | English | 0 |
| 2 Dutch only | `/` | → `/` (307) | → `/` (307) | `nl` | Dutch | 0 |
| 3 Both, Dutch on `/` | `/` | `/en` | → `/` (307) | `nl` | Dutch | 2 |
| 4 Both, English on `/` | `/` | → `/` (307) | `/nl` | `en` | English | 2 |

"Copy" was read off the navbar: English renders `Home / About / Services / Locations / Contact /
Book appointment`, Dutch renders `Home / Over ons / Diensten / Locaties / Contact / Afspraak maken`.

With `EN_URL = "/en"` **and** `NL_URL = "/nl"`, so neither language owns `/`, `/` redirected (307) to
`/nl` — `DEFAULT_LANGUAGE`'s own URL — while `/en` and `/nl` both served 200.

The switcher:

- With both languages on and `SHOW_LANGUAGE_TOGGLE = true`, two `role="group"` switchers are in the
  DOM (the desktop action bar and the mobile header, each hidden at the other's breakpoint). At
  390×844, 2 are in the DOM and exactly 1 is visible.
- Setting `SHOW_LANGUAGE_TOGGLE = false` with **both languages still on** drops both to zero, while
  `/nl` keeps serving Dutch — the translations are still reachable, just not via a button.
- Clicking it navigates and re-renders: setup 3 `/` → `/en` (`lang` `nl`→`en`, "Over ons"→"About");
  setup 4 `/` → `/nl` (`lang` `en`→`nl`, "About"→"Over ons").

Safety fallbacks:

| Settings | Result on `/` |
| --- | --- |
| both `*_ENABLED` false, `DEFAULT_LANGUAGE = "nl"` | Dutch |
| both `*_ENABLED` false, `DEFAULT_LANGUAGE = "en"` | English |
| `EN_ENABLED` true, `NL_ENABLED` false, `DEFAULT_LANGUAGE = "nl"` | English wins |
| `NL_ENABLED` true, `EN_ENABLED` false, `DEFAULT_LANGUAGE = "en"` | Dutch wins |

Forms with `BACKEND_ENABLED = false`, under this clone's live setup (setup 1, English):

- Enquiry dropdown offered exactly `["Select a service", "Lighting Installation"]` — `Consultation`
  correctly filtered out by `withoutConsultation()`.
- Submitting the enquiry reached the **"Message Sent!"** thank-you.
- The booking modal listed both services, generated **16** local slots for the chosen date
  (09:00–17:00 at the 30-minute interval, rendered `9:00 AM - 9:30 AM` …), and walking
  service → slot → details → *Confirm booking* reached the **"Thanks, …!"** success step.
- **Total API requests captured across all of that: 0.**

The same walkthrough under setup 2 (Dutch) gave `["Kies een dienst", "Lighting Installation"]`,
slots rendered in 24-hour form (`09:00 - 09:30`), and the **"Bedankt, …!"** booking success step,
also with **0 API requests** — but the Dutch *enquiry* submit does not reach its thank-you. That is
a pre-existing template bug, unrelated to the settings system; see §7.

The gate in the other direction:

- `BACKEND_ENABLED = true` → `GET https://api.getgrowthrocket.com/api/v1/public/bookings/settings`
  fired twice on page load (both forms mount on the page) and again when the booking modal opened,
  confirming `apiUrl()` composes the URL correctly. (It answers `404` from a browser for the
  host-resolution reason in §2.)
- `BACKEND_ENABLED = true` with `API_BASE_URL = ""` → zero API requests, confirming the
  `isBackendEnabled()` guard.

---

## 7. Notes and gotchas

- **Keep the type annotations** (`: boolean`, `: string`, `: Language`) on every setting. Without
  them TypeScript pins each value to a literal and then reports the opposite branch as an impossible
  comparison the moment you flip a switch.
- **Nothing is deleted when a language is switched off.** Both languages' copy stays in each
  component's `COPY`/`CONTENT` map and `t({ en, nl })` calls, and in `lib/metadata.ts`, which is what
  makes moving between the four setups a settings-only change.
- **Static service lists live in the forms, not in settings**, because their shape is form-specific.
  They are only read when the backend is off.
- **The redirects are redirects, not 404s** — a disabled or non-canonical language URL sends the
  visitor to `/` rather than an error page, with a `307`.
- **`API_BASE_URL` is currently the GrowthRocket tenant API**, kept because it is the source the
  static snapshots came from. It is inert while `BACKEND_ENABLED` is `false`; change it when this
  client gets its own backend. Note that this bare root only resolves a tenant **by request host**,
  so switching the backend on while developing off-host will 404 — for a host-independent live
  setup, use the tenant-scoped root
  `https://api.getgrowthrocket.com/api/v1/public/tenants/tij/sites/tij` instead, which `apiUrl()`
  composes against just as happily.
- **Pre-existing bug: the Dutch enquiry submit button is hijacked by the modal trigger.**
  `components/shared/ModalContext.tsx` delegates clicks globally and treats any button whose label
  matches `BOOKING_TRIGGER_LABELS` as a "open the booking modal" trigger. That list contains
  `"afspraak aanvragen"`, which is exactly the Dutch `submitLabel` the enquiry form is given in
  `components/sections/AppointmentSection.tsx:55`. In Dutch, clicking *Afspraak aanvragen* therefore
  calls `preventDefault()` and opens the **booking modal** instead of submitting the enquiry —
  verified in the browser. The English label ("Request appointment") matches nothing in that list, so
  setup 1 is unaffected. This predates the settings system (it arrived with commit `ad5f09d`
  "Dutch added") and needs a decision before shipping a Dutch build: either rename that
  `submitLabel`, or make the enquiry form's submit button opt out of the delegation (it already
  supports `data-modal-target`, and `getModalTargetFromTrigger` checks that first).
- **Dates and times in the booking modal are localised, prices are not.** `BookingForm.tsx` threads
  `lang === "nl" ? "nl-NL" : "en-US"` through `formatDateLong`, `formatDateShort`,
  `formatSingleTime` and `formatHHMM`, which is why the slot list reads `9:00 AM - 9:30 AM` in
  English and `09:00 - 09:30` in Dutch. The one exception is `formatPrice` (`:145`), which calls
  `new Intl.NumberFormat(undefined, …)` and so follows **the visitor's browser locale, not the site's
  language**. Both of this tenant's services have a null/zero `priceMinor`, so nothing currently
  renders through it.
- **Pre-existing lint errors** in `components/shared/Button.tsx` (three `no-explicit-any`) are
  inherited from the template and unrelated to the settings system. Every file the settings system
  touches lints clean.
- **Dead code left in place**: `components/shared/LeadEnquiryForm.tsx` carries ~580 lines of
  commented-out earlier versions below the live component, some still referencing the
  `meridian-logistics` tenant, and `app/layout.tsx` has a commented-out duplicate `RootLayout`.
  Neither is wired to anything — delete them or leave them, but do not treat them as live code.
- **Adding a language** means extending the `Language` union in `settings.ts`, adding its
  `*_ENABLED` and `*_URL` constants, extending `enabledLanguages()` and `pathForLanguage()` in
  `lib/i18n.ts`, adding its entry to `lib/metadata.ts`, adding `app/<lang>/page.tsx`, and adding the
  copy to each component's `COPY`/`CONTENT` map and `t({ … })` calls.
