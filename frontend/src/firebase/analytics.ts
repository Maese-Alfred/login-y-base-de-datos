import app from "./firebaseConfig";
import { getAnalytics, Analytics } from "firebase/analytics";

// Inicializa Firebase Analytics
const analytics: Analytics = getAnalytics(app);

export default analytics;