import googleActions from '../google/googleActions'
import ServiceReducer from './ServiceReducer'

class GoogleDefaultServiceReducer extends ServiceReducer {
  /**
  * Updates the unread info for gmail
  * @param mailbox: the mailbox that contains the service
  * @param service: the service to update
  * @param historyId: the new history id
  * @param unreadCount: the current unread count
  * @param unreadThreads: an array of full thread infos that have not been read
  */
  static updateUnreadInfo (mailbox, service, historyId, unreadCount, unreadThreads) {
    return service.changeData({
      historyId: isNaN(parseInt(historyId)) ? undefined : parseInt(historyId),
      unreadCount: unreadCount,
      unreadThreads: unreadThreads
    })
  }

  /**
  * Sets the history id on the service
  * @param mailbox: the mailbox that contains the service
  * @param service: the service to update
  * @param historyId: the new history id
  */
  static setHistoryId (mailbox, service, historyId) {
    historyId = isNaN(parseInt(historyId)) ? undefined : parseInt(historyId)
    if (service.historyId !== historyId) {
      return service.changeData({ historyId: historyId })
    }
  }

  /**
  * Sets the unread mode
  * @param mailbox: the mailbox that contains the service
  * @param service: the service to update
  * @param unreadMode: the new unread mode
  */
  static setUnreadMode (mailbox, service, unreadMode) {
    if (service.unreadMode !== unreadMode) {
      googleActions.syncMailboxMessages.defer(mailbox.id, true)
      return service.changeData({ unreadMode: unreadMode })
    }
  }

  /**
  * Sets a custom unread query to request from google
  * @param mailbox: the mailbox that contains the service
  * @param service: the service to update
  * @param query: the query string to set
  */
  static setCustomUnreadQuery (mailbox, service, query) {
    if (query !== service.customUnreadQuery) {
      googleActions.syncMailboxMessages.defer(mailbox.id, true)
      return service.changeData({ customUnreadQuery: query })
    }
  }

  /**
  * Sets a custom unread query to request from google
  * @param mailbox: the mailbox that contains the service
  * @param service: the service to update
  * @param str: the watch string
  */
  static setCustomUnreadLabelWatchString (mailbox, service, str) {
    if (str !== service.customUnreadLabelWatchString) {
      googleActions.syncMailboxMessages.defer(mailbox.id, true)
      return service.changeData({ customUnreadLabelWatchString: str })
    }
  }
}

export default GoogleDefaultServiceReducer
