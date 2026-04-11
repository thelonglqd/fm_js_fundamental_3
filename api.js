export const promiseData = new Promise(resolve => {
  setTimeout(() => {
    resolve(fetch('./data.json'))
  }, 1000)
})
