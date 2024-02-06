export default (rectInfoList) => {
  const verticalSet = new Set()
  const horizonSet = new Set()
  let verticalLine = -99999
  let horizonLine = -99999
  rectInfoList.forEach(({ left, right, top, bottom }) => { 
    if (verticalSet.has(right)) {
      verticalLine = right
    }
    if (verticalSet.has(left)) {
      verticalLine = left
    }
    if (horizonSet.has(bottom)) {
      horizonLine = bottom
    }
    if (horizonSet.has(top)) {
      horizonLine = top
    }
    verticalSet.add(left).add(right)
    horizonSet.add(top).add(bottom)
  })
  return [verticalLine, horizonLine]
}
