import { useEffect, useState } from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

interface CurrencyInputWrapperProps extends CurrencyInputProps {
    value: number | undefined;
}
/**
 * Wrap the CurrencyInput so we can track the value as a number 
 * and still get proper formatting such as adding .00 onblur
 * @param props 
 * @returns 
 */
const CurrencyInputWrapper = (props: CurrencyInputWrapperProps) => {
    // Track the amounts separately so we can have the external value be numeric
    // and still pass a non-numeric value for the value prop so we get proper formatting
    const [amount, setAmount] = useState<string | number | undefined>(props.value);
    const [rawAmount, setRawAmount] = useState<undefined | null | number>(props.value);

    //Handle the value being updated externally.
    useEffect(() => {
        if (props.value !== rawAmount) {
            setAmount(props.value?.toFixed(2))
        }
    }, [props.value, rawAmount]);

    return <CurrencyInput
        {...props}
        value={amount}
        onValueChange={(value, name, values) => {
            setAmount(values?.value);
            setRawAmount(values?.float);
            if (props.onValueChange) {
                props?.onValueChange(value, name, values);
            }
        }}
    />
}

export default CurrencyInputWrapper;