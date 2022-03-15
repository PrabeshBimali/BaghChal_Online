import './LoginComponents.css';

function handleChange(event, updateFunction){
    updateFunction(event.target.name, event.target.value);
}

function Label(props) {
  return <label className='form_label'>
      {props.label}
  </label>;
}

export function Username(props){
    return(
        <div className='form_text_container'>
            <Label label="Username:"/>
            <input name='username' className='form_input' type='text' placeholder='Username'
            minLength={5} maxLength={25} required onChange={(event)=>{ handleChange(event, props.updateFunction)}}></input>
        </div>
    )
    
}

export function Email(props){
    return(
        <div className='form_text_container'>
            <Label label="Email:"/>
            <input name='email' className='form_input' type='email' placeholder='Email' required
            onChange={(event)=>{handleChange(event, props.updateFunction)}}></input>
        </div>
    )
}

export function Password(props){
    return(
        <div className='form_text_container'>
            <Label label="Password:"/>
            <input name='password' className='form_input' type='password' placeholder='Password' 
            minLength={8} required onChange={(event)=>{handleChange(event, props.updateFunction)}}></input>
        </div>
    )
}

export function Button(props){
    return(
        <button className='form_button'>{props.buttonName}</button>
    )
}

