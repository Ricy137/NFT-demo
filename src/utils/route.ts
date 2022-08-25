import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
/**
 * @description route jump
 * @param {}
 * @returns {}
 */
const routeJump = (route: string, e: React.MouseEvent<HTMLElement, MouseEvent> | undefined = undefined, outside = false): void => {
  if (e) {
    e.preventDefault()
  }
  if (outside) {
    window.open(route)
  } else {
    history.push(route)
    history.go(0) //
  }
}

export { history, routeJump }
