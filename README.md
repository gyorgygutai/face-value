# face-value

Upload your face. Watch it become something else.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What It Does

Pick a photo of yourself. Pick an outcome. Get a generated image back in seconds. That's it. Built as a Next.js 16 feature showcase — every architectural decision has a reason behind it.

## Built With

- [Next.js 16](https://nextjs.org)
- [FLUX.2 klein 9B q6p](https://huggingface.co/black-forest-labs/FLUX.2-klein-9B) via [Draw Things](https://drawthings.ai) gRPC server
- [RunPod Serverless](https://runpod.io) — on-demand, scales to zero
- [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/applications/) — email OTP auth

## Next.js Features Demonstrated

See [SPECS.md](./SPECS.md) for full decisions and reasoning.

## How To Run It

### Prerequisites

- Node.js 20+
- RunPod account with serverless endpoint configured
- Cloudflare Access application set up in front of your domain

### Environment Variables

See [.env.example](./.env.example) for required variables.

### Dev

```bash
npm install
npm run dev
```

### Deploy

```bash
npm run build
```

Deploy to any Node.js host. Ensure your domain is proxied through Cloudflare with Access enabled.

## Working with Agents

See [AGENTS.md](./AGENTS.md).

### TODO: Recommended models

| Cost | Model | Best for |
|------|-------|----------|
| Free | Gemini 2.0 Flash | Quick tasks, low stakes |
| Mid | Claude Sonnet 4.6 | Everyday coding, tests |
| Top | Claude Opus 4.6 | Complex reasoning, architecture |

## License

MIT
