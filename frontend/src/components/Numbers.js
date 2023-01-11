const Numbers = ({persons, eraseHandler}) => 
    <>
        <h2>Numbers</h2>
        <div>
        {persons.map( 
            (p) => 
            <div key={p.id}>
                <span>
                    {p.name} {p.number}
                </span>
                <button onClick={eraseHandler(p.id, p.name)}>
                    delete
                </button>
            </div> 
            )
        }
        </div>
    </>

export default Numbers
