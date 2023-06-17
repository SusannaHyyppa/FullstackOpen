import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    
    const v = (id) => {
        dispatch(vote(id))
        dispatch(addNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    }

    const compareNumbers = (a1,a2) => {
        return a2.votes - a1.votes
    } 
    
    return (
        <div>
            {anecdotes.filter(a => a.content.includes(filter.value)).sort((a1,a2) => compareNumbers(a1,a2)).map(anecdote => (
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => v(anecdote.id)}>vote</button>
                </div>
            </div>
        ))}
        </div>
    )
}

export default AnecdoteList