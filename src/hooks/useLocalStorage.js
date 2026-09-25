import { useEffect, useState } from "react"


export function useLocalStorage(innitialValue,key) {
    const[value,setValue]=useState(()=>{
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : innitialValue
    })
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])
  return [value,setValue]
}

export default useLocalStorage