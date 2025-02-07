import calculateInsurance from "../../components/insuranceCalculator";

export default defineEventHandler((event:any) => {
    // console.log(event)
    const query = getQuery(event);

    if(!query.year) {
        return {
            hello: "world"
        }
    }

    const yearData = query.year;
    const priceData = query.price;
    const isNet = query.isNet;
    const isGps = query.isGps;

    const calculatorOutcome = calculateInsurance(yearData, priceData, isNet, isGps);

    return {
        outcome: calculatorOutcome,  //event.body.toString();
    }
})