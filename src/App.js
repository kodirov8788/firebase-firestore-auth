import { useContext, useEffect, useState } from 'react';
import './App.css';
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import db from "./firebase/FirebaseConfig"
import Listitem from './components/listItem/Listitem';
import ReactLoading from "react-loading";
import { ProductContext } from './context/ProductContext';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from './firebase/FirebaseConfig';

function App() {

  const { isLoading, setIsLoading, user } = useContext(ProductContext)
  console.log(user)
  const [inputData, setInputData] = useState({
    name: "",
    qarz: "",
    number: "",
    commit: ""
  })

  const [firebaseData, setFirebaseData] = useState([])
  console.log(firebaseData)
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "sales"));
      let box = []
      querySnapshot.forEach((doc) => {
        box.push({ id: doc.id, data: doc.data() })
      });
      setFirebaseData(box)
    }
    setTimeout(() => {
      getData()
    }, 300);

  }, [isLoading])

  const AddData = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    await addDoc(collection(db, "sales"), inputData).then(res => {
      console.log(res)
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
      setIsLoading(false)
    })

  }



  const SignIn = () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error)
      });
  }
  const SignOut = () => {
    return signOut(auth).then(() => {
      window.location.reload()
    }).catch((error) => {
      // An error happened.
    });
  }



  return (
    <div className="App">

      <button onClick={SignIn}>Sign In</button>
      <button onClick={SignOut}>Sign Out</button>
      <img src={user?.photoURL} alt="" />
      <h1>{user.displayName}</h1>
      <h1>{user.email}</h1>
      {
        isLoading ? <div className="loader">
          <ReactLoading type={"spokes"} width={"100px"} color="#fff" />
        </div> : <></>
      }

      <h1>Hello</h1>


      <form action="" onSubmit={AddData}>
        <label htmlFor="">Ism</label>
        <input type="text" required placeholder='ismni kiriting'
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })} />

        <label htmlFor="">Qarz miqdori</label>
        <input type="number" required placeholder='qarz miqdori'
          onChange={(e) => setInputData({ ...inputData, qarz: e.target.value })} />


        <label htmlFor="">Tel raqam</label>
        <input type="number" required placeholder='tel raqam kiriting...'
          onChange={(e) => setInputData({ ...inputData, number: e.target.value })} />

        <label htmlFor="">Izoxni yozing</label>
        <input type="text" required
          onChange={(e) => setInputData({ ...inputData, commit: e.target.value })} />

        <button>Jo'natish</button>
      </form>



      <div className="collection">
        {
          firebaseData.map(item => (
            <Listitem key={item.id} item={item} />
          ))
        }
      </div>

    </div>
  );
}

export default App;
