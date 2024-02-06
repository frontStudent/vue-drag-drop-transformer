export const getTransformParams = (el) => {
    const curTransform = el.style.transform
    const regex = /translate\((-?\d+)px,\s*(-?\d+)px\)/
    const match = curTransform.match(regex)
    let translateX, translateY
    if (match) {
      const [_, x, y] = match
      translateX = Number(x)
      translateY = Number(y)
    } else {
      translateX = 0
      translateY = 0
    }
    return [translateX, translateY]
}

export const getPxNumber = (prop) => {
  const regex = /(-?\d+)px/
  const match = prop.match(regex)
  return match ? Number(match[1]) : 0
}