import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3101);
createApp().listen(port, () => {
  process.stdout.write(`LoreVerse listening on http://localhost:${port}\n`);
});

