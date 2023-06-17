import { removeNotification, addNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.value)
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  } 
  

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification