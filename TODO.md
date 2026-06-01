# TODO: Actionable Tasks

## 🔄 Agent Workflow & Testing Rules

- **Workflow**: Plan → Dev implements → Test proposes cases → User approves → Test implements (red) → Dev fixes (green) → Verify.
- **Framework**: Vitest + React Testing Library
- **Scope**: One test file per component or Server Action
- **Philosophy**: Test behaviour, not implementation
- **Coverage**: Empty, single, many, loading, success, error states as defined in SPECS

## ✅ Done

- Strip default Next.js boilerplate
- Static Server Component shell with outcome loading
- `useActionState`, `useFormStatus`, `useOptimistic`
- Image upload, validation, resize, base64
- Inference payload + call, error propagation
- `<a download>` for generated image

## 🎁 Nice to Haves

- [ ] `fetch` cache: cache key = image hash + outcome id, `revalidate: false`
- [ ] Layout: fields side-by-side via inline wrapping, button centered

## 🔐 Access

- [ ] Configure Cloudflare Access email OTP for domain gating
- [ ] `proxy.ts`: CF JWT verification with `jose` against CF public certs, redirect on invalid token
- [ ] `await cookies()` for CF auth header injection into inference call
- [ ] Ensure origin URL remains private — CF as only entry point

## 🚀 Production Setup

- [ ] `proxy.ts` routing logic (pre-auth, origin proxying only)
- [ ] Enable React Compiler in `next.config.ts`
- [ ] Complete `.agents/` definitions (`developer`, `doc-writer`, `test-engineer`)
- [ ] Deploy

## 🧪 Tests

- [ ] Outcome loading (empty, 1, many), `<select>` population, static shell render
- [ ] Form states, error display, optimistic UI, loading state, download link
- [ ] File validation, server action error paths, payload preparation
- [ ] Outcome resolution, payload structure, inference error propagation
- [ ] Cache behavior (cache key = hash + outcome id)
- [ ] JWT validation paths, redirect on invalid token, auth header injection
