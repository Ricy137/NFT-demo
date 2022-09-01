class Session {
  /**
   * encrypt data
   * @param {any} tanslate data into base64 type
   */
  encrypt(data) {
    let set = encodeURIComponent(data),
      result = window.btoa(set)
    return result
  }
  /**
   * decrypt data
   * @param {any} data
   */
  MyLocker(data) {
    try {
      let jieMi = atob(data),
        jieM = decodeURIComponent(jieMi)
      return jieM
    } catch (e) {
      throw Error('Oops, mistakes happened when decrypting')
    }
  }
  /**
   *  return different storage objects according to params
   * @param Session
   * @returns {Storage} default:no params -> return sessionStorage object，true=>return localStorage object
   */
  sessionType(Session) {
    return Session ? localStorage : sessionStorage
  }
  /**
   * check whether the current key exists
   * @param key
   * @constructor
   */
  ISKET(key) {
    if (!key) {
      throw Error('Pass KEY of Session')
    }
  }
  /**
   * Methods of Session storage
   * @param key value for storage
   * @param setObj data for storage
   * @param Session storage localStorage or sessionStorage default: sessionStorage
   */
  setSession(key, setObj, Session?) {
    this.ISKET(key)
    if (Object.keys(setObj).length > 0) {
      setObj = JSON.stringify(setObj)
    }

    this.sessionType(Session).setItem(this.encrypt(key), this.encrypt(setObj))
  }
  /**
   * Get the storaged
   * @param key key of storage
   * @param Session  storage localStorage or sessionStorage default: sessionStorage
   * @returns {any} data related to the specific key
   */
  getSession(key, Session?) {
    this.ISKET(key)
    let data = this.sessionType(Session).getItem(this.encrypt(key))
    if (data) {
      try {
        return JSON.parse(this.MyLocker(data))
      } catch (e) {
        console.error('Oops, mistakes happened when using getSession')
        return false
      }
    }
  }
  sessionClear(key, Session) {
    this.ISKET(key)
    this.sessionType(Session).removeItem(key)
  }
  sessionClearAll(Session) {
    this.sessionType(Session).clear()
  }
}
export default Session
