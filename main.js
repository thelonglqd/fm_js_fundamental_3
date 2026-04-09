let activitiesData = []

function setLoadingState(state) {
  const main = document.querySelector('.main')
  main?.setAttribute('data-loading', '' + state)
}

function generateCardSelector(title) {
  return `.activities__card--${title.replace(' ', '')}`.toLowerCase()
}

function renderCards(data, frame = 'daily') {
  data.forEach(activity => {
    const cardContainerSelector = generateCardSelector(
      activity.title,
    )

    const cardTitle = document.querySelector(
      `${cardContainerSelector} .activities__title`,
    )

    if (cardTitle && cardTitle.innerText)
      cardTitle.innerText = activity.title

    const cardInfoCurrent = document.querySelector(
      `${cardContainerSelector} .activities__current`,
    )

    if (cardInfoCurrent && cardInfoCurrent.innerText)
      cardInfoCurrent.innerText = `${activity.timeframes[`${frame}`].current}hrs`

    const cardInfoPrevious = document.querySelector(
      `${cardContainerSelector} .activities__previous`,
    )

    if (cardInfoPrevious && cardInfoPrevious.innerText) {
      if (frame === 'daily') {
        cardInfoPrevious.innerText = `Yesterday - ${activity.timeframes[`${frame}`].previous}hrs`
      } else if (frame === 'weekly') {
        cardInfoPrevious.innerText = `Last week - ${activity.timeframes[`${frame}`].previous}hrs`
      } else if (frame === 'monthly') {
        cardInfoPrevious.innerText = `Last monthly - ${activity.timeframes[`${frame}`].previous}hrs`
      }
    }
  })
}

const navButtons = document.querySelectorAll('.btn--nav')

function handleNavButtonClick(e) {
  const currentActive = document.querySelector(
    '.btn--nav.active',
  )
  currentActive?.classList?.remove('active')
  e.target.classList.add('active')

  renderCards(activitiesData, e.target.name)
}

navButtons?.forEach(btn => {
  btn.addEventListener('click', handleNavButtonClick)
})

const promiseData = new Promise(resolve => {
  setTimeout(() => {
    resolve(fetch('./data.json'))
  }, 1000)
})

promiseData
  .then(response => response.json())
  .then(data => {
    activitiesData = data
    renderCards(activitiesData)
    setLoadingState(false)
  })
