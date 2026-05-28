import { ViteReactSSG } from "vite-react-ssg";
import axios from "axios";
import { routes } from "./routes";
import "./sass/index.scss";

axios.defaults.baseURL = "/api/v1/";

export const createRoot = ViteReactSSG({ routes });
