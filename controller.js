import { promiseData } from './api.js'
import {
  handleNavButtonClick,
  setLoadingState,
  renderCards,
} from './renderer.js'
import {
  getActivitiesData,
  setActivitiesData,
} from './store.js'

const mainSelector = '.main'

const navButtons = document.querySelectorAll('.btn--nav')

navButtons?.forEach(btn => {
  btn.addEventListener('click', e =>
    handleNavButtonClick(e, getActivitiesData()),
  )
})

export const init = () => {
  promiseData
    .then(response => response.json())
    .then(data => {
      setActivitiesData(data)
      renderCards(data)
      setLoadingState(false, mainSelector)
    })
}
