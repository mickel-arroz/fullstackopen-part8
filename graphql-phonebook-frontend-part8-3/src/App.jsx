import { useQuery, useLazyQuery } from "@apollo/client/react"
import { useEffect, useState } from "react"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS, FIND_PERSON } from "./queries"



const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON) 
  const [person, setPerson] = useState(null)

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result.data])

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }
  
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)} >
            show address
          </button> 
        </div>  
      )}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, 
    {
      refetchQueries: [ { query: ALL_PERSONS } ]
  }
  )

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return <>
      <Notify errorMessage={errorMessage} />
    <Persons persons={result.data?.allPersons || []} />
    <PersonForm notify={notify} />
  </>
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{
      color: 'red',
    }}>
    {errorMessage}
    </div>
  )
}

export default App
