<template>
  <div class="container">
    <div class="space-right">
      <h1 class="">Mengapa Penawaran Ini Sangat sayang untuk dilewatkan?
      </h1>
      <ul>
        <li v-for="(feature, i) in featureList" :key="i" class="flex">
          <div class="check-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-middle">
              <path
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
            </svg>
          </div>
          <p class="mb-1 align-middle">{{ feature }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const featureList = [
  "Aplikasi ini 100% Gratis dan tidak ada biaya apapun",
  "Mudah dalam pengukuran produktivitas",
  "Tersedia sertifikat hasil pengukuran produktivitas",
  "Mudah digunakan & Menghemat waktu anda"
];
</script>

<style scoped>
h1 {
  font-weight: 800;
  font-size: 2rem;
  line-height: 45px;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.1rem;
  font-weight: normal;
  margin-top: 0.5rem;
  color: grey;
}

h4 {
  font-size: 1.1rem;
  color: #F86061;
  font-weight: normal;
  margin-bottom: 1.5rem;
  /* text-transform: uppercase; */
  letter-spacing: 3px;
}

h6 {
  color: grey;
  font-weight: normal;
  font-size: 0.8rem;
  margin: 0.5rem 0 0 1rem;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0.5rem 0;
}

.check-container>svg {
  width: 30px;
  height: 30px;
  fill: #1CA83B;
  margin: auto;
}

li>p {
  font-size: 1.5rem;
  padding-left: 10px;
  color: grey;
}

input {
  outline: none;
  border: none;
  font-size: 0.9rem;
  width: 100%;
  margin-left: 0.7rem;
}

.container {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-bottom: 6rem;
  padding: 2% 0% 0% 10%;
  max-width: 1500px;
}

.space-right {
  /* padding: 0 25rem 0 0; */
  padding: 0;
  grid-column: span 2;
}

.register-form {
  display: flex;
  flex-direction: row;
  padding: 0.3rem 0.3rem;
  border: 0.5px solid red;
  border-radius: 10px;
  width: 75%;
  margin-top: 0.5rem;
}

.flex-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 5rem;
  /* width: 100%; */
}

.illustration-container {
  /* margin-left: 2rem; */
  position: relative;
  margin-right: 0;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  /* width: 30%; */
  z-index: 0;
}

.illustration-container>img {
  margin: auto;
  object-fit: cover;
  position: absolute;
  right: 0;
  top: -15%;
  /* max-width: 500px; */
  /* width: 100%; */
  height: 800px;
  min-height: 400px;
  z-index: -5;
}

.demo-container {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
}

/* .check-container {
  position: relative;
  display: flex;
  background-color: inherit;
  border: 0.5px solid grey;
  padding: 5px 8px;
  margin-right: 20px;
} */
@media (max-width:400px) {
  h1 {
    font-size: 1.6rem;
    line-height: 33px;
  }

  h2 {
    font-size: 0.8rem;
  }

  input {
    font-size: 0.8rem;
  }

  .space-right {
    padding: 0;
    text-align: center;
  }

  .register-form {
    width: 100%;
  }

  .demo-container {
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    padding-left: 5%;
    padding-right: 5%;
    ;
    margin-bottom: 1rem;
  }

  .illustration-container {
    /* margin-left: 2rem; */
    margin: auto;
    display: flex;
    flex-direction: row;
    /* width: 30%; */
    z-index: 0;
  }

  .illustration-container>img {
    object-fit: cover;
    height: 300px;
    position: inherit;
    margin: auto;
  }
}

@media (min-width: 1920px) {
  .container {
    padding-right: 10%;
  }
}
</style>