export const vQuit = {
  mounted: (el) => {
    document.addEventListener('click', () => {
      // console.log(e.target, e.currentTarget)
      el.setAttribute('magicStatus', 'cancel')
      el.style.cursor = 'default'
    })
  }
}
