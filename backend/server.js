import app from "./index.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3030;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
