export default async function handler(req, res) {
  try {
    const { default: app } = await import("../backend/src/server.js");
    return app(req, res);
  } catch (error) {
    console.error("Serverless Loader Crash:", error);
    res.status(500).json({
      error: "Serverless Loader Crash",
      message: error.message,
      stack: error.stack,
    });
  }
}
