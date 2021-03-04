import React,{useState} from 'react'

export default function LoginUser() {
    const [user, setuser] = useState({
        username:'',
        password:'',
        email:''

    })
    function LogInUser(e){
        //console.log(e.target.name,e.target.value)

        let FormValid=true;
        if(e.target.name=='email'){
            FormValid=/\S+@\S+\.\S+/.test(e.target.value)
        }
        if(e.target.name=='password'){
            const len=e.target.value.length>6;
            const passValid=/[0-9]/.test(e.target.value)
                FormValid = len && passValid;
            
        }
        if(FormValid){
              const changeInfo={...user}
              changeInfo[e.target.name]=e.target.value;
              setuser(changeInfo)
        }
    }
    function SubmitForm(){
       

    }
    return (
        <div>
            <p>Username:{user.username}</p>
            <p>Email:{user.email}</p>
            <p>Pass:{user.password}</p>
            <form action="" onSubmit={SubmitForm}>
            <input type="text" onBlur={LogInUser} name="username" placeholder="Enter your name" required /><br />
            <input type="email" onBlur={LogInUser} name="email" placeholder="Enter your email" required /><br />
            <input type="password" onBlur={LogInUser} name="password" placeholder="Enter your password" required /><br />
            <input type="submit" value="Submit"/>
            </form>
            
        </div>
    )
}
