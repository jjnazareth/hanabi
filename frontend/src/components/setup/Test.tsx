
import React from "react"

interface FormProps<T> {
  values: T
  children: (values: T) => JSX.Element
}

const Form = <T extends {}>({ values, children }: FormProps<T>) => {
  return (
    children(values)
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Form values={{ lastName: "Bob" }} >
        {values => <div>{values.lastName}</div>}
      </Form>
    </div>
  )
}
