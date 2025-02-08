import calculateInsurance from "../../components/insuranceCalculator";

export default defineEventHandler((event:any) => {
    const query = getQuery(event);

    if(!query.year) {
        return {
            message: "To use this api pass 4 arguments: year, price isNet and isGps"
        }
    }

    const yearData = Number(query.year);
    const priceData = Number(query.price);
    const isNet = query.isNet === "true";
    const isGps = query.isGps === "true";

    const calculatorOutcome = calculateInsurance(yearData, priceData, isNet, isGps);

    return {
        outcome: calculatorOutcome
    }
})