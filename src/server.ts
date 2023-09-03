import { app } from "./app";
const PORT = process.env.PORT || 3500;

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
