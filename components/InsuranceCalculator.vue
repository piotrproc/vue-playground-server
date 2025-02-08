<script setup lang="ts">
import CalulatorView from './CalulatorView.vue'

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
  <CalulatorView>
    <template #heading>Application - Car insurance calculator</template>

    <br/>
    <form id="mainForm" onsubmit="return false;">
      <div>
        <label for="year">Rocznik samochodu</label>
        <input v-model="year" id="year" name="year" type="number" placeholder="Podaj rocznik samochodu" required/>
      </div>

      <div>
        <label for="price">Wartość samochodu</label>
        <input v-model="price" id="price" name="price" type="number" placeholder="Podaj wartość samochodu" required/>
      </div>

      <fieldset>
        <legend>Rodzaj wartości</legend>

        <div>
          <input v-model="priceType" type="radio" id="net" name="net" value="net" checked/>
          <label for="net">Netto</label>
        </div>

        <div>
          <input v-model="priceType" type="radio" id="gross" name="gross" value="gross"/>
          <label for="gross">Brutto</label>
        </div>

      </fieldset>

      <input v-model="gps" type="checkbox" id="gps" name="gps" value="GPS" checked>
      <label for="gps">Pakiet Drive+ (GPS)</label><br>

      <button @click="async () => {
        const insurance = await getInsurance(year, price, priceType, gps);
        coefficient = insurance.value.outcome.coefficient;
        contribution = insurance.value.outcome.contribution;
        installmentDivHide = '';
        installmentPrice = 0;
      }">Oblicz
      </button>
    </form>
    <p id="coefficientDiv">Twój współczynnik to: <span id="coefficient">{{ coefficient }}</span></p>
    <p>Wysokość twojej składki to: <span id="contribution">{{ contribution }}</span></p>

    <fieldset :class="installmentDivHide">
      <legend>Rozłożenie składki na raty:</legend>
      <div>
        <input v-model="installmentType" type="radio" id="installment2" name="installment2" value="2" checked/>
        <label for="installment2">2 składki</label>
      </div>

      <div>
        <input v-model="installmentType" type="radio" id="installment4" name="installment4" value="4"/>
        <label for="installment4">4 składki</label>
      </div>

      <button @click="async () => {
        const insurance = await getInstallments(contribution, installmentType);
        installmentPrice = insurance.value.outcome;
      }">Oblicz raty</button>
      <p>Wysokość raty to: <span>{{ installmentPrice }}</span></p>
    </fieldset>

    <p class="error-message">{{ error }}</p>
  </CalulatorView>
</template>

<script lang="ts">
import calculateInstallments from "../server/installmentsCalculator";

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