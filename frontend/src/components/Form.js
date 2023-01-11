import Input from "./Input"

const Form = ({submitHandler, nameValue, nameChange, phoneValue, phoneChange}) => 
    <form onSubmit={submitHandler}>
        <Input 
            text={"name"}
            value={nameValue}
            onChange={nameChange}
        />
        <Input 
            text={"phone"}
            value={phoneValue}
            onChange={phoneChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
    </form>


export default Form