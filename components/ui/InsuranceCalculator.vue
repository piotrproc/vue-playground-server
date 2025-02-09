<script setup lang="ts">
import CalculatorView from './CalculatorView.vue'
import Input from "./input/Input.vue";
import Label from "./label/Label.vue";
import Badge from "./badge/Badge.vue";

const getInsurance = async (year, price, priceType, isGps) => {
  const isNet = priceType == "net";

  const {data} = await useFetch('/api/calculate-insurance', {
    method: 'POST',
    params: {
      year,
      price,
      isNet,
      isGps
    }
  });

  return data;
}

const getInstallments = async (price, installmentType) => {
  const are2Installments = installmentType == "2";

  const {data} = await useFetch('/api/calculate-installments', {
    method: 'POST',
    params: {
      price,
      are2Installments
    }
  });

  return data;
};
</script>

<template>
  <CalculatorView>
    <template #heading>Application - Car Insurance Calculator</template>

    <br/>
    <div :class="errorClass"><Badge class="error-message inline-block rounded-sm w-[35%]" variant="destructive">{{ error }}</Badge></div>
    <form id="mainForm" onsubmit="return false;">
      <div>
        <Label for="year">Rocznik samochodu</Label>
        <Input v-model="year" id="year" name="year" type="number" placeholder="Podaj rocznik samochodu" required class="w-[35%] block"/>
      </div>

      <div>
        <Label for="price">Wartość samochodu</Label>
        <Input v-model="price" id="price" name="price" type="number" placeholder="Podaj wartość samochodu" required class="w-[35%] block"/>
      </div>

      <fieldset>
        <legend>Rodzaj wartości</legend>

        <div>
          <input v-model="priceType" type="radio" id="net" name="net" value="net" checked/>
          <Label for="net" class="cursor-pointer">Netto</Label>
        </div>

        <div>
          <input v-model="priceType" type="radio" id="gross" name="gross" value="gross" />
          <Label for="gross" class="cursor-pointer">Brutto</Label>
        </div>

      </fieldset>

      <input v-model="gps" type="checkbox" id="gps" name="gps" value="GPS" checked>
      <Label for="gps" class="cursor-pointer">Pakiet Drive+ (GPS)</Label><br>

      <Button @click="async () => {
        const insurance = await getInsurance(year, price, priceType, gps);
        coefficient = insurance.value.outcome.coefficient;
        contribution = insurance.value.outcome.contribution;
        error = insurance.value.outcome.error;
        if(!error) {
          installmentDivHide = '';
          installmentPrice = 0;
          errorClass = 'hidden';
        }
        else {
          errorClass = '';
          installmentPrice = 0;
        }
      }" class="mx-12 my-5">Oblicz
      </Button>
    </form>
    <p id="coefficientDiv">Twój współczynnik to: <span id="coefficient" class="font-bold">{{ coefficient }}</span></p>
    <p>Wysokość twojej składki to: <span id="contribution" class="font-bold">{{ contribution }}</span></p>

    <fieldset :class="installmentDivHide" class="my-3">
      <legend>Rozłożenie składki na raty:</legend>
      <div>
        <input v-model="installmentType" type="radio" id="installment2" name="installment2" value="2" checked/>
        <Label for="installment2" class="cursor-pointer">2 składki</Label>
      </div>

      <div>
        <input v-model="installmentType" type="radio" id="installment4" name="installment4" value="4"/>
        <Label for="installment4" class="cursor-pointer">4 składki</Label>
      </div>

      <Button @click="async () => {
        const insurance = await getInstallments(contribution, installmentType);
        installmentPrice = insurance.value.outcome;
      }" class="mx-12 my-5">Oblicz raty</Button>
      <p>Wysokość raty to: <span id="installmentPrice" class="font-bold">{{ installmentPrice }}</span></p>
    </fieldset>
  </CalculatorView>
</template>

<script lang="ts">

export default {
  name: "InsuranceCalculator",
  data() {
    return {
      year: "",
      price: "",
      priceType: "net",
      gps: true,
      coefficient: 0,
      contribution: 0,
      installmentType: "2",
      installmentDivHide: "hidden",
      installmentPrice: 0,
      error: "",
      errorClass: "hidden"
    };
  }
};
</script>