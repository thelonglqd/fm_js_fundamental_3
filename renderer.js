function generateElements(cardType) {
  const containerSelector = `.activities__card--${cardType}`
  const titleSelector = '.activities__title'
  const currentSelector = '.activities__current'
  const previousSelector = '.activities__previous'

  return {
    containerEle: document.querySelector(containerSelector),
    titleEle: document.querySelector(
      `${containerSelector} ${titleSelector}`,
    ),
    currentEle: document.querySelector(
      `${containerSelector} ${currentSelector}`,
    ),
    previousEle: document.querySelector(
      `${containerSelector} ${previousSelector}`,
    ),
  }
}

const cardElements = {
  work: generateElements('work'),
  play: generateElements('play'),
  study: generateElements('study'),
  exercise: generateElements('exercise'),
  social: generateElements('social'),
  selfcare: generateElements('selfcare'),
}

const btnActiveSelector = '.btn--nav.active'
const classActive = 'active'
const dataLoadingAttribute = 'data-loading'

export function setLoadingState(state, selector) {
  const main = document.querySelector(selector)
  main?.setAttribute(dataLoadingAttribute, String(state))
}

function toCardKey(title = '') {
  return title.toLowerCase().replace(' ', '')
}

export function renderCards(data, frame = 'daily') {
  data.forEach(activity => {
    const key = toCardKey(activity.title)
    const { titleEle, currentEle, previousEle } =
      cardElements[key]

    if (titleEle) titleEle.textContent = activity.title

    if (currentEle)
      currentEle.textContent = `${activity.timeframes[`${frame}`].current}hrs`

    if (previousEle) {
      if (frame === 'daily') {
        previousEle.textContent = `Yesterday - ${activity.timeframes[`${frame}`].previous}hrs`
      } else if (frame === 'weekly') {
        previousEle.textContent = `Last week - ${activity.timeframes[`${frame}`].previous}hrs`
      } else if (frame === 'monthly') {
        previousEle.textContent = `Last monthly - ${activity.timeframes[`${frame}`].previous}hrs`
      }
    }
  })
}

export function handleNavButtonClick(e, data) {
  const currentActive = document.querySelector(
    btnActiveSelector,
  )
  currentActive?.classList?.remove(classActive)
  e.currentTarget.classList.add(classActive)

  renderCards(data, e.currentTarget.name)
}
