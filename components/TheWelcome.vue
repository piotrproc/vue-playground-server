<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
let data = "";

const getInsurance = async (year, price, priceType, gps) => {

  const {data} = await useFetch('/api/hello', {
    method: 'POST',
    params: {
      // My form data
      people: "guys"
    }
  });
  console.log(year);
  console.log(data);
}

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon/>
    </template>
    <template #heading>Application - Car insurance calculator {{ data }}</template>

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

      <button @click="() => getInsurance(year, price, priceType, gps)">Oblicz</button>
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

      <button @click="calculateInstallmentsView">Oblicz raty</button>
      <p>Wysokość raty to: <span>{{ installmentPrice }}</span></p>
    </fieldset>

    <p class="error-message">{{ error }}</p>
  </WelcomeItem>
</template>

<script lang="ts">
import calculateInsurance from "./insuranceCalculator";
import calculateInstallments from "./installmentsCalculator";

export default {
  name: "HelloWorld",
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
      const yearData = Number(this.year);
      const priceData = Number(this.price);
      const isNet = this.priceType == "net";
      const isGps = this.gps;

      try {
        const calculatorOutcome = calculateInsurance(yearData, priceData, isNet, isGps);
        this.coefficient = calculatorOutcome.coefficient;
        this.contribution = calculatorOutcome.contribution;
        this.installmentDivHide = "";
        this.installmentPrice = 0;
      } catch (error) {
        this.error = error.message;
      }

    },
    calculateInstallmentsView() {
      const are2Installments = this.installmentType == "2";

      this.installmentPrice = calculateInstallments(this.contribution, are2Installments);
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