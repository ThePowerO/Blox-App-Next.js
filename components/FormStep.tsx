import ComboForm from "./CreateCombo/ComboForm";
import FormDetails from "./CreateCombo/FormDetails";
import { useFormState } from "./FormContext";

export function FormStep() {
    const { step } = useFormState();

    switch (step) {
        case 1:
            return <ComboForm />;
        case 2:
            return <FormDetails />;
        default:
            return null;
    }
}