import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const MAIL_KEY = 'mailDB'
_createMailList()
export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            console.log(mails)
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.body))
            }
            if (filterBy.category) {
                const regex = new RegExp(filterBy.category, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}



function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function getDefaultFilter() {
    return { txt: '', category: '' }
}


function _createMailList() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        console.log('creating mails')
        mails = [
            _createRandomInboxMail(),
            _createRandomInboxMail(),
            _createRandomInboxMail()
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createRandomInboxMail() {
    return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(20),
        isRead: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com',
        from: 'messi@appsus.com'
    }

}