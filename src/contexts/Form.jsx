import React,{createContext,useState} from "react";
export const FormContext=createContext();
export const FormProvider=({children})=>{
    const [Form, setForm] = useState({Name:'',Email:'',Contact:'',Passkey:'',Gst:'',Address:'',Btype:''})
    return(
        <FormContext.Provider value={[Form,setForm]}>
            {children}
        </FormContext.Provider>
    )
}

