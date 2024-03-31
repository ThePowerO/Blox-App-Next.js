import React, { ReactNode, createContext, useContext, useState } from 'react'

interface TComboFormData {
    combotitle: string;
    combodescription: string;
    specialty: string;
    race: string;
    mainStats: string;
    comboVideo: string;
    fightingstyle: string;
    weapon: string;
    fruit: string;
    sword: string;
}

interface IFormContext {
    onHandleNext: () => void
    onHandleBack: () => void
    step: number
    formData: TComboFormData
    setFormData: React.Dispatch<React.SetStateAction<TComboFormData>>
}

const FormContext = createContext<IFormContext>({
    onHandleNext: () => {},
    onHandleBack: () => {},
    step: 1,
    formData: {
        combotitle: "",
        combodescription: "",
        specialty: "",
        race: "",
        mainStats: "",
        comboVideo: "",
        fightingstyle: "",
        weapon: "",
        fruit: "",
        sword: "",
    },
    setFormData: () => {},
});

interface IProps {
    children: ReactNode;
}

export function FormProvider({children}: IProps) {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<TComboFormData>({
        combotitle: "",
        combodescription: "",
        specialty: "",
        race: "",
        mainStats: "",
        comboVideo: "",
        fightingstyle: "",
        weapon: "",
        fruit: "",
        sword: "",
    });

    function onHandleNext() {
        console.log({step});
        setStep((prevValue) => prevValue + 1)
    }

    function onHandleBack() {
        setStep((prevValue) => prevValue - 1)
    }

    console.log({formData});

  return (
    <FormContext.Provider value={{ onHandleBack, onHandleNext, step, formData, setFormData }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormState() {
    return useContext(FormContext)
}