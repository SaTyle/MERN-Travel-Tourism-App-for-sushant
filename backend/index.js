import app from "./app.js";

// Start server only for local/dev runs. On Vercel the app will be wrapped in a serverless function.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
