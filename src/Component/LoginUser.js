import React,{useState} from 'react'
import  firebase from "firebase/app";
import 'firebase/auth';
export default function LoginUser() {
    const [newUserInfo, setnewUserInfo] = useState(false)
    const [user, setuser] = useState({
        login:false,
        username:'',
        email:'',
        password:'',
        error:'',
        suc:''
    })
    function UserDetail(e){
        //console.log(e.target.name,e.target.value)
        let FormValid=true;
        if(e.target.name==='email'){
            FormValid=/\S+@\S+\.\S+/.test(e.target.value)

        }
        if(e.target.name==='password'){
            const PassValid1=e.target.value.length>6
            const PassValid2=/[a-z]/.test(e.target.value)
            FormValid=PassValid1 && PassValid2
        }
        if(FormValid){
            const UserInfo={...user}
            UserInfo[e.target.name]=e.target.value
            setuser(UserInfo)
        }
        
    }
    function formSubmit(e){
        if(newUserInfo && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                   const UserInfo={...user}
                   UserInfo.suc='Logging Successfully';
                   UserInfo.login=true;
                   setuser(UserInfo)
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const UserInfo={...user}
                    UserInfo.error= error.message;
                    setuser( UserInfo)
                   
                });

        }
        else if(!newUserInfo && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email,user.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                const UserInfo={...user}
                UserInfo.suc='Logging Successfully';
                UserInfo.login=true;
                setuser(UserInfo)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                const UserInfo={...user}
                    UserInfo.error= error.message;
                    setuser( UserInfo)
            });

        }
        e.preventDefault();

    }
    function logOutUser(){
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            const logOut={
                   login:false,
                    username:'',
                    email:'',
                    password:'',
                    error:'',
                    suc:'Log-out Successfully'
            }
            setuser(logOut)
          }).catch((error) => {
            // An error happened.
          })
    }
    return (
        <div>
            <form action="" onSubmit={formSubmit}>
                <input type="checkbox" onClick={()=>setnewUserInfo(!newUserInfo)} name="checkbox" id=""/>
                <label htmlFor="">New User Sign-up</label><br /><br />
                {
                newUserInfo ? <input type="text" onBlur={UserDetail} name="username" placeholder="Enter Your name" required />:''

                }
               <br /> <input type="email" onBlur={UserDetail} name="email" placeholder="Enter Your email" required /><br />
                <input type="password" onBlur={UserDetail} name="password" placeholder="Enter Your password" required /><br />
                {
                    user.login?<input type="submit" onClick={logOutUser} value="Log-Out"/>:<input type="submit" value="Log-In"/>
                }
                
            </form>{
           user.login? <p style={{color:'green'}}>{user.suc}</p>:<p style={{color:'red'}}>{user.error}</p>
            }
        </div>
    )
}
