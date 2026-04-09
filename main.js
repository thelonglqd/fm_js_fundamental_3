let userData = []

const navButtons = document.querySelectorAll('.btn--nav')

function handleNavButtonClick(e) {
  const currentActive = document.querySelector(
    '.btn--nav.active',
  )
  currentActive?.classList?.remove('active')
  e.target.classList.add('active')

  if (e.target.name === 'daily') {
    const informationSections = document.querySelector(
      '.activities__info--bottom',
    )
    // informationSections?.forEach(information => {

    // })
  }
}

navButtons?.forEach(btn => {
  btn.addEventListener('click', handleNavButtonClick)
})

const promiseData = fetch('/data.json')
console.log('promise object :::', promiseData)
promiseData
  .then(response => response.json())
  .then(data => (userData = data))
