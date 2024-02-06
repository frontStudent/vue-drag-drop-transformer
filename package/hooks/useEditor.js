import useEditable from './useEditable'
import useMoveable from './useMoveable'
import useResizable from './useResizable'
import useClickOutside from './useClickOutside'

export default (el, binding) => {
  useEditable(el, binding)
  useResizable(el, binding)
  useClickOutside(el)
  useMoveable(el, binding)
}