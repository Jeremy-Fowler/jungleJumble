import { AppState } from "../AppState.js"
import { Pop } from "../utils/Pop.js"
import { saveState } from "../utils/Store.js"

function _saveJumbles() {
  saveState('jumbles', AppState.jumbles)
}

class JumblesService {
  startJumble() {
    const jumble = AppState.activeJumble
    jumble.startTime = Date.now()
  }
  setActiveJumble(jumbleId) {
    const foundJumble = AppState.jumbles.find(jumble => jumble.id == jumbleId)
    AppState.activeJumble = foundJumble

    this.startJumble()
  }

  checkAnswer(jumbleString) {
    if (jumbleString != AppState.activeJumble.body) {
      Pop.error("You're all jumbled up, sucka 🙈🙉🙊🐵")
      return
    }
    this.endGame()
  }

  endGame() {
    const jumble = AppState.activeJumble
    jumble.endTime = Date.now()
    if (jumble.fastestTime == null || jumble.fastestTime > jumble.elapsedTime) {
      jumble.fastestTime = jumble.elapsedTime
      Pop.success("You got the high score!!!!")
      _saveJumbles()
    }
    AppState.activeJumble = null
    AppState.emit('jumbles')
  }
}

export const jumblesService = new JumblesService