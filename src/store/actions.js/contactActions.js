import contactService from '../../services/contactService'

export function loadContacts() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().contactModule
        try {
            const contacts = await contactService.query(filterBy)
            dispatch({ type: 'SET_ROBOTS', contacts })
        } catch (err) {
            console.log(err);
        }
    }
}
export function getContactById(contactId) {
    return async dispatch => {
        const contact = await contactService.getById(contactId)
        dispatch({ type: 'SET_ROBOT', contact })
    }
}
export function tryContact(contactId) {
    return async dispatch => {
        const contact = await contactService.tryContact(contactId)
        dispatch({ type: 'UPDATE_ROBOT', contact })
    }
}

export function removeContact(contactId) {
    return async dispatch => {
        await contactService.remove(contactId)
        dispatch({ type: 'REMOVE_ROBOT', contactId })
    }
}

export function setFilterBy(filterBy) {
    return dispatch => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}