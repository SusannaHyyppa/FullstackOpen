import { useState } from 'react'

const StatisticLine = (props) => {
  return (
  
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    
  )
}

const Statistics = (props) => {
  
  let average = 0
  let pos = 0
  if (props.total !== 0) {
    average = (1*props.good+0*props.neutral+(-1)*props.bad)/props.total
    pos = props.good/props.total*100
    pos = Math.round(pos * 10) / 10
  }
  else {
    return (
     
      <p>No feedback given</p>
     
      
      )
  }
  
  return (
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="total" value={props.total} />
      <StatisticLine text="average" value={Math.round(average * 10)/10} />
      <StatisticLine text="positive" value={pos.toString().concat(" %")} />
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
    setTotal(total+1)
  }
  const neutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total+1)
  }
  const badClick = () => {
    setBad(bad + 1)
    setTotal(total+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
      <h1>statistics</h1>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
      />
    </div>
  )
}

export default App