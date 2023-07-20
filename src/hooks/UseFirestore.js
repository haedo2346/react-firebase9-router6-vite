import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite"
import { useEffect, useState } from "react"
import { db, auth } from "../firebase"
import { nanoid } from "nanoid"

const UseFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})
    

    const getData = async () => {
      console.log(auth.currentUser)
      try {
          setLoading(prev => ({...prev, getData: true}))
          const dataRef = collection(db, "Urls")
          const q = query(
            dataRef, 
            where("uid", "==", auth.currentUser.uid))
          const querySnapshot = await getDocs(q);
          const dataDB = querySnapshot.docs.map(doc => (doc.data()))
          setData(dataDB)
      } catch (error) {
        console.log(error)
        setError(error.message)

      }
      finally{
        setLoading(prev => ({...prev, getData: false}))
      }
    }

    const addData = async (url) => {
      try {
        setLoading(prev => ({...prev, addData: true}))
        const newDoc = {enabled:true,nanoid: nanoid(6), origin: url, uid:auth.currentUser.uid}
        const docRef = doc(db, "Urls", newDoc.nanoid)
        await setDoc(docRef, newDoc)
        setData([...data, newDoc])

      } catch (error) {
        setError(error.message)

      }
      finally{setLoading(prev => ({...prev, addData: false}))}
    }

    const deleteData = async (nanoid) => {
      try {
        setLoading(prev => ({...prev, [nanoid]: true}))
        const docRef = doc(db, "Urls", nanoid)
        await deleteDoc(docRef)
        setData(data.filter(item => item.nanoid !== nanoid))
      } catch (error) {
        console.log(error)
        setError(error.message)

      }
      finally{setLoading(prev => ({...prev, [nanoid]: false}))}
    }

    const updateData = async (nanoid, newOrigin) => {
      try {
        setLoading(prev => ({...prev, updateData: true}))
        const docRef = doc(db, "Urls", nanoid)
        await updateDoc(docRef, {origin: newOrigin})
        setData(data.map(item => item.nanoid === nanoid ? ({...item, origin:newOrigin}) : item))
      } catch (error) {
        console.log(error)
        setError(error.message)

      }
      finally{setLoading(prev => ({...prev, updateData: false}))}
    }

    const searchData = async (nanoid) => {
      try {
        const docRef = doc(db, "Urls", nanoid)
        const docSnap = await getDoc(docRef)

        return docSnap
      } catch (error) {
        console.log(error)
        setError(error.message)

      }
      
    }

  return {data, error, loading, getData, addData, deleteData, updateData, searchData}
  
}

export default UseFirestore