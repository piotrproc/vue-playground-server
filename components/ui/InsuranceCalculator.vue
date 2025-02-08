<script setup lang="ts">
import CalculatorView from './CalculatorView.vue'
import Input from "./input/Input.vue";

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
      price: price,
      are2Installments: are2Installments
    }
  });

  return data;
};
</script>

<template>
  <CalculatorView>
    <template #heading>Application - Car insurance calculator</template>

    <br/>
    <form id="mainForm" onsubmit="return false;">
      <div>
        <label for="year">Rocznik samochodu</label>
        <Input v-model="year" id="year" name="year" type="number" placeholder="Podaj rocznik samochodu" required class="w-2xs"/>
      </div>

      <div>
        <label for="price">Wartość samochodu</label>
        <Input v-model="price" id="price" name="price" type="number" placeholder="Podaj wartość samochodu" required class="w-2xs"/>
      </div>

      <fieldset>
        <legend>Rodzaj wartości</legend>

        <div>
          <Input v-model="priceType" type="radio" id="net" name="net" value="net" checked class="w-3xs inline h-auto"/>
          <label for="net">Netto</label>
        </div>

        <div>
          <Input v-model="priceType" type="radio" id="gross" name="gross" value="gross" class="w-3xs inline h-auto"/>
          <label for="gross">Brutto</label>
        </div>

      </fieldset>

      <input v-model="gps" type="checkbox" id="gps" name="gps" value="GPS" checked>
      <label for="gps">Pakiet Drive+ (GPS)</label><br>

      <Button @click="async () => {
        const insurance = await getInsurance(year, price, priceType, gps);
        coefficient = insurance.value.outcome.coefficient;
        contribution = insurance.value.outcome.contribution;
        error = insurance.value.outcome.error;
        if(!error) {
          installmentDivHide = '';
          installmentPrice = 0;
        }
      }">Oblicz
      </Button>
    </form>
    <p id="coefficientDiv">Twój współczynnik to: <span id="coefficient">{{ coefficient }}</span></p>
    <p>Wysokość twojej składki to: <span id="contribution">{{ contribution }}</span></p>

    <fieldset :class="installmentDivHide">
      <legend>Rozłożenie składki na raty:</legend>
      <div>
        <Input v-model="installmentType" type="radio" id="installment2" name="installment2" value="2" checked class="w-3xs inline h-auto"/>
        <label for="installment2">2 składki</label>
      </div>

      <div>
        <Input v-model="installmentType" type="radio" id="installment4" name="installment4" value="4" class="w-3xs inline h-auto"/>
        <label for="installment4">4 składki</label>
      </div>

      <Button @click="async () => {
        const insurance = await getInstallments(contribution, installmentType);
        installmentPrice = insurance.value.outcome;
      }">Oblicz raty</Button>
      <p>Wysokość raty to: <span>{{ installmentPrice }}</span></p>
    </fieldset>

    <p class="error-message">{{ error }}</p>
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
      installmentDivHide: "installmentDivHide",
      installmentPrice: 0,
      error: ""
    };
  },
  methods: {
    calculateInsuranceView() {
      this.error = "";

      try {

      } catch (error) {
        this.error = error.message;
      }

    }
  }
};
</script>

<style scoped>
input[type=number] {
  display: block;
}

.installmentDivHide {
  display: none;
}
</style>