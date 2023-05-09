const Header = (props) => {
    return (
      <div>
         <h1>{props.course}</h1>
      </div>
     
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.part} {props.exercise}</p>
      </div>
    )
  }
  
  const Content = (props) => {
  
    return (
      <div>
        {props.parts.map(part => {
          return(
            <Part key={part.id}
              part={part.name} exercise={part.exercises}
            />
          )
        })}
      </div>
    )
  }
  
  const Total =(props) => {
    const total = props.parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <div>
        <strong> total of {total} exercises </strong>
      </div>
    )
  
  }
  

  const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
     
    )
  }
  
  const Courses = ({courses}) => {
    return (
      <div>
        {courses.map(course => {
          return(
            <Course key={course.id} course={course} />
          )
        })}
      </div>
    )
  }

  export default Courses