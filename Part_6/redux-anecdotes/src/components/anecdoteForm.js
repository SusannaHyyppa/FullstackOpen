import { useSelector, useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
        dispatch(addNotification(`you added '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit = {addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm