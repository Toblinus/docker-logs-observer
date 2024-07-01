import { startUnixSocket } from "./controllers/unix-socket";
import { startWebSocket } from "./controllers/web-socket";

startUnixSocket();
startWebSocket();
