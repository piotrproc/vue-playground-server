const calculateInstallments = (price: number, are2Installments: string) => {
    let installment = are2Installments == "true" ? Math.floor(price / 2) : Math.floor(price / 4);

    installment += 200;

    if(are2Installments) {
        installment = Math.floor(installment * 102 / 100);
    }
    else {
        installment = Math.floor(installment * 104 / 100);
    }

    return installment;
};

export default calculateInstallments;