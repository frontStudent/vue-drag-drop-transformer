export const vQuit = {
  mounted: (el) => {
    document.body.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        el.setAttribute('magicStatus', 'cancel')
        el.style.cursor = 'default'
      }
    })
  }
}
