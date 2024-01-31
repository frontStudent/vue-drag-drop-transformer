import useEditable from './useEditable'
import useMoveable from './useMoveable'
import useResizable from './useResizable'
import useClickOutside from './useClickOutside'

export default (el) => {
  useEditable(el)
  useResizable(el)
  useClickOutside(el)
  useMoveable(el)
}