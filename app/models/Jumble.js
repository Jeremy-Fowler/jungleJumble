import { generateId } from "../utils/generateId.js";

export class Jumble {
  constructor ({ name, body }) {
    this.id = generateId()
    this.name = name
    this.body = body
    this.fastestTime = null
    this.startTime = null
    this.endTime = null
  }

  get elapsedTime() {
    return this.endTime - this.startTime
  }

  get fastestTimeInSeconds() {
    if (!this.fastestTime) {
      return 'N/A'
    }

    return (this.fastestTime / 1000).toFixed(2)
  }
  get fastestTimeInMinutes() {
    if (!this.fastestTime) {
      return 'N/A'
    }

    return (this.fastestTime / 60000).toFixed(2)
  }

  get wordsPerMinute() {
    if (!this.fastestTime) {
      return 'N/A'
    }
    const wordCount = this.body.split(' ').length

    // @ts-ignore
    return (wordCount / this.fastestTimeInMinutes).toFixed(2)
  }

  get ListTemplate() {
    return `
    <div class="d-flex justify-content-between align-items-center mb-1">
      <button onclick="app.JumblesController.setActiveJumble('${this.id}')" class="btn btn-warning">Start</button>
      <div>${this.name}</div>
      <div title="Fastest Time">
        <i class="mdi mdi-clock"></i>
        <span>${this.fastestTimeInSeconds}s</span>
      </div>
      <div>
        <p class="mb-0">${this.wordsPerMinute} WPM</p>
      </div>
    </div>
    `
  }

  get ActiveTemplate() {
    return `
    <div>
      <div class="jumble-card mb-3">
        <h2 class="d-flex justify-content-between fs-3">
          <span>${this.name}</span>
          <span>Fastest Time ${this.fastestTimeInSeconds}s</span>
        </h2>
        <p>${this.body}</p>
      </div>
      <div class="jumble-card">
        <form onsubmit="app.JumblesController.submitJumble(event)">
          <textarea name="jumbleBody" id="jumbleInput"></textarea>
          <button type="submit" class="btn btn-info w-100">Submit</button>
        </form>
      </div>
    </div>
    `
  }


}