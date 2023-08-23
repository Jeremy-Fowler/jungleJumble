import { AboutController } from "./controllers/AboutController.js";
import { JumblesController } from "./controllers/JumblesController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: JumblesController,
    view: ''
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]