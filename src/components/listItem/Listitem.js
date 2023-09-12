import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import db from "../../firebase/FirebaseConfig"
import { ProductContext } from '../../context/ProductContext';

function Listitem({ item }) {
    const { isLoading, setIsLoading } = useContext(ProductContext)
    const [qarzInput, setQarzInput] = useState("")
    console.log(qarzInput)

    const DeleteData = async (id) => {
        await deleteDoc(doc(db, "sales", id));
        window.location.reload()
    }


    const Plus = async (id) => {

        if (qarzInput === "") {
            alert("miqdor kiriting!")
        } else {
            setIsLoading(true)
            const qarz_qoshish = doc(db, "sales", id);
            let qoshuv_qiymat = Number(item.data.qarz) + Number(qarzInput)

            await updateDoc(qarz_qoshish, {
                qarz: qoshuv_qiymat
            }).then(res => {
                setIsLoading(false)
                console.log(res)
                setQarzInput("")
            }).catch(err => {
                setIsLoading(false)
                console.log(err)
                setQarzInput("")
            })
        }


    }
    const Minus = async (id) => {

        if (qarzInput === "") {
            alert("miqdor kiriting!")
        } else {
            setIsLoading(true)
            const qarz_ayiruv = doc(db, "sales", id);
            let ayiruv_qiymat = Number(item.data.qarz) - Number(qarzInput)

            await updateDoc(qarz_ayiruv, {
                qarz: ayiruv_qiymat
            }).then(res => {
                setIsLoading(false)
                console.log(res)
                setQarzInput("")
            }).catch(err => {
                setIsLoading(false)
                console.log(err)
                setQarzInput("")
            })
        }


    }
    return (
        <div key={item.id} className="list_item ">
            <h1>{item.data.name}</h1>
            <h1>{item.data.qarz}</h1>
            <h2>{item.data.number}</h2>
            <h2>{item.data?.commit}</h2>
            <div className="">
                <input value={qarzInput} type="number" onChange={(e) => setQarzInput(e.target.value)} placeholder='miqdor kiriting' />
                <button onClick={() => Plus(item.id)} style={{ background: "red", color: "white" }}>Qarz qo'shish</button>
                <button onClick={() => Minus(item.id)} style={{ background: "green", color: "white" }}>Qarzdan ayirish</button>

            </div>
            <button onClick={() => DeleteData(item.id)}>delete data</button>
        </div>
    )
}

export default Listitem