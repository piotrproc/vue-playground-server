import calculateInstallments from "../../components/installmentsCalculator";

export default defineEventHandler((event:any) => {
    // console.log(event)
    const query = getQuery(event);

    if(!query.price) {
        return {
            hello: "world2"
        }
    }

    const price = query.price;
    const are2Installments = query.are2Installments;

    const installmentPrice = calculateInstallments(price, are2Installments);

    return {
        outcome: installmentPrice

        //outcome: calculatorOutcome,  //event.body.toString();
    }
})