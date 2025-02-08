const getContributionCoefficient = (netPrice: number) => {
    if (netPrice <= 40000) return 8;
    if (netPrice <= 100000) return 5;
    if (netPrice <= 200000) return 4;
    if (netPrice <= 400000) return 2;
    throw new Error("Dla samochodów powyżej 400000 zł netto\n" +
        "składki nie szacujemy, ponieważ potrzebne jest dokładne wyliczenie\n" +
        "składki u ubezpieczyciela.");
};

const isCarNew = (yearData: number) => {
    const currentYear = new Date().getFullYear();
    return yearData === currentYear - 2 || yearData === currentYear - 1 || yearData === currentYear;
};

const isCarTooOld = (yearData: number) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearData;

    return age > 5;
};

const handleTooOldCar = (yearData: number) => {
    if (isCarTooOld(yearData)) {
        throw new Error("Samochodów starszych od 5 lat w ogóle nie obsługujemy.");
    }
}

const calculateNetPrice = (priceData: number, isNet: boolean) => {
    return isNet ? priceData : Math.floor(priceData * 123 / 100);
};

const calculateInsurance = (yearData: number, priceData: number, isNet: boolean, isGps: boolean) => {
    const netPrice = calculateNetPrice(priceData, isNet);
    let coefficient = getContributionCoefficient(netPrice);

    if (!isCarNew(yearData)) {
        coefficient++;
    }

    handleTooOldCar(yearData);

    const contribution = calculateContribution(netPrice, coefficient, isGps);

    const outcome:any = {};
    outcome.coefficient = coefficient;
    outcome.contribution = contribution;
    outcome.error = "";

    return outcome;
};

const calculateContribution = (netPrice: number, coefficient: number, isGps:boolean) => {
    let contribution = Math.floor(netPrice * coefficient / 100);

    if(!isGps) {
        contribution = Math.floor(contribution * 111 / 100);
    }

    return contribution;
};

export default calculateInsurance;