import BigPixels from "../layout/bigPixels";
import { GridContainer, GridItem } from "../ui/grid";
import { useState } from "react";


const BudgetPage = () => {
    const [name, setName] = useState("");
    const [items, setItems] = useState({
        0: { price: "", sum: 0, count: "", spec: "" },
        1: { price: "", sum: 0, count: "", spec: "" },
        2: { price: "", sum: 0, count: "", spec: "" },
        3: { price: "", sum: 0, count: "", spec: "" }
    });
    const [total, setTotal] = useState(0);
    const [purpose, setPurpose] = useState("");
    const [clearing, setClearing] = useState("");
    const [account, setAccount] = useState("");
    const [bank, setBank] = useState("");
    const [valid, setValid] = useState({});

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleItemChange = (e) => {
        const { name, value } = e.target;
        const { price, count } = items[name];
        const sum = price * count;
        setItems({
            ...items,
            [name]: {
                ...items[name],
                [name]: value,
                sum
            }
        })
    }
    const handleTotalChange = (e) => {
        setTotal(e.target.value);
    }
    const handlePurposeChange = (e) => {
        setPurpose(e.target.value);
    }
    const handleClearingChange = (e) => {
        setClearing(e.target.value);
    }
    const handleAccountChange = (e) => {
        setAccount(e.target.value);
    }
    const handleBankChange = (e) => {
        setBank(e.target.value);
    }
    const handleValidChange = (e) => {
        setValid(e.target.value);
    }

    return (
        <BigPixels>
            <GridContainer>
                <GridItem>
                    <h1>Personligt utlägg</h1>
                    
                </GridItem>
                <GridItem>
                    <h1>PDF</h1>
                </GridItem>
            </GridContainer>
        </BigPixels>
    )
}

export default BudgetPage;