const app = require("./app");
const { initDb } = require("./config/db");

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend", error);
    process.exit(1);
  }
}

startServer();
