import calculateInstallments from "../../components/installmentsCalculator";

export default defineEventHandler((event:any) => {
    const query = getQuery(event);

    if(!query.price) {
        return {
            message: "To use this api pass 2 arguments: price and are2Installments"
        }
    }

    const price = Number(query.price);
    const are2Installments = query.are2Installments === "true";

    const installmentPrice = calculateInstallments(price, are2Installments);

    return {
        outcome: installmentPrice
    }
})