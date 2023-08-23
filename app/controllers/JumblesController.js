import { AppState } from "../AppState.js";
import { jumblesService } from "../services/JumblesService.js";
import { setHTML } from "../utils/Writer.js";

function _drawJumbles() {
  console.log('huh');
  const jumbles = AppState.jumbles
  let listContent = ''
  jumbles.forEach(jumble => listContent += jumble.ListTemplate)
  setHTML('jumbles', listContent)
}

function _drawActiveJumble() {
  if (!AppState.activeJumble) {
    setHTML('activeJumble', '')
    return
  }

  setHTML('activeJumble', AppState.activeJumble.ActiveTemplate)

  document.getElementById('jumbleInput').focus()
}


export class JumblesController {
  constructor () {
    _drawJumbles()

    AppState.on('jumbles', _drawJumbles)
    AppState.on('activeJumble', _drawActiveJumble)
  }

  setActiveJumble(jumbleId) {
    jumblesService.setActiveJumble(jumbleId)
  }

  submitJumble(event) {
    event.preventDefault()
    const jumbleInput = document.getElementById('jumbleInput')
    // @ts-ignore
    jumblesService.checkAnswer(jumbleInput.value)
  }

}