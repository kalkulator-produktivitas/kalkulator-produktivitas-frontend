<template>
  <div>
    <button @click="modal.show = true"
      class="bg-blue-500 hover:bg-blue-700 text-white mx-auto w-[70%] lg:w-full lg:px-2 rounded ease-in duration-200 flex items-center justify-center">
      <Icon name="fe:link-external" class="lg:mr-1 collapse lg:visible" />
      Certificate
    </button>
    <div v-if="modal.show" class="modal-overlay absolute z-20">
      <div class="mx-auto mt-2 overflow-y-auto h-[98vh]">
        <div class="mb-4 w-full flex">
          <div class="mx-auto">
            <button type="button"
              class="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full w-32 h-9"
              @click="generatePDF">
              Save
            </button>
            <button type="button"
              class="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full w-32 h-9"
              @click="modal.show = false">
              Close
            </button>
          </div>
        </div>
        <div class="grid grid-rows-2 gap-1 mx-auto flex-shrink-0">
          <div class="mx-auto" style="visibility:visible;">
            <div class="pdf-content" id="pdfContent1">
              <div class="content">
                <img src="../assets/Emblem_sertifikat.png" alt="" srcset="" style="height: 8em;" class="emblem">
                <div class="title">
                  <p class="title-text">SERTIFIKAT</p>
                  <p class="title-text">HASIL PENGUKURAN PRODUKTIVITAS</p>
                  <p class="title-text">DENGAN PENDEKATAN KALKULATOR PRODUKTIVITAS</p>
                </div>
                <div class="nomor-sertif">
                  <p>Nomor: {{ nomorSertifikat }}.147/KALK.P3D/DKI/{{ props.analysis.year }}</p>
                </div>
                <div class="perusahaan">
                  <p>{{ authUser.data.nama_perusahaan }}</p>
                </div>
                <div class="title" style="margin-top: 1.5em;">
                  <p class="title-text">HASIL TEST</p>
                  <p class="title-text">TINGKAT PRODUKTIVITAS</p>
                  <p class="title-text">Rp {{
                    new
                      Intl.NumberFormat('id').format(Math.round(result.pr1)) }}/TAHUN/KARYAWAN</p>
                </div>
                <div class="nomor-sertif">
                  <p>Kategori Produktivitas: {{ penilaian }}</p>
                </div>
                <div class="title" style="margin-top: 1em; margin-bottom: 1em;">
                  <p class="title-text">DIKELUARKAN OLEH:</p>
                  <p class="normal-text">Kepala Pusat Pengembangan Produktivitas Daerah</p>
                  <p class="normal-text">Dinas Tenaga Kerja Transmigrasi dan Energi</p>
                  <p class="normal-text">Pemerintah Provinsi DKI Jakarta</p>
                </div>
                <div>
                  <img src="../assets/QR_Pak_Tsani.png" alt="" srcset="" style="height: 4em;" class="qr-ttd">
                </div>
                <div style="font-size: 1.1em; text-align: center;" class="font-bold">
                  <p>M. Tsani Annafari</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mx-auto" style="visibility: visible;">
            <div class="pdf-content-2" id="pdfContent2">
              <div class="content-2">
                <div class="header-2">
                  <p>Tingkat Produktivitas Perusahaan Anda:</p>
                </div>
                <p class="text-xl font-bold text-center mt-2">Kategori: {{ penilaian }}</p>
                <div class="grid grid-cols-3 gap-2 mt-6">
                  <div class="col-span-1">
                    <table class="tables text-sm font-light text-center">

                      <tbody>
                        <tr>
                          <td class="">Kategori Produktvitas</td>
                          <td class="">Nilai/ Produktivitas/ Tahun/ Tenaga Kerja (Rp)</td>
                        </tr>
                        <tr>
                          <td>Tinggi</td>
                          <td>> 100 Juta</td>
                        </tr>
                        <tr>
                          <td>Sedang</td>
                          <td>80 - 99.9 Juta</td>
                        </tr>
                        <tr>
                          <td>Rendah</td>
                          <td>58 - 79.9 Juta</td>
                        </tr>
                        <tr>
                          <td>Sangat Rendah</td>
                          <td>0 - 57.9 Juta</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-span-2 border border-black p-1">
                    <p>Intisari Tentang Perusahaan Anda</p>
                    <ul v-if="!result.fy" class="list-disc text-sm pl-8">
                      <li>
                        Nilai tambah perusahaan anda pada tahun {{ props.analysis.year }} adalah Rp {{ new
                          Intl.NumberFormat('id').format(result.nt) }}
                      </li>
                      <li>
                        Tingkat produktivitas tenaga kerja perusahaan anda pada tahun {{ props.analysis.year }} adalah Rp
                        {{
                          new
                            Intl.NumberFormat('id').format(Math.round(result.pr1)) }}
                      </li>
                      <li>
                        Tingkat produktivitas modal anda pada tahun {{ props.analysis.year }} berubah sebesar {{
                          Math.round(result.knm * 100) / 100 }}% dari tahun sebelumnya
                      </li>
                      <li>
                        Profitabilitas perusahaan tahun {{ props.analysis.year }} berubah sebesar {{ Math.round(result.knp
                          *
                          100) / 100 }}%
                        dari tahun sebelumnya
                      </li>
                    </ul>
                    <ul v-else class="list-disc text-sm pl-8">
                      <li>
                        Nilai tambah perusahaan anda pada tahun {{ props.analysis.year }} adalah Rp {{ new
                          Intl.NumberFormat('id').format(result.nt) }}
                      </li>
                      <li>
                        Tingkat produktivitas tenaga kerja perusahaan anda pada tahun {{ props.analysis.year }} adalah Rp
                        {{
                          new
                            Intl.NumberFormat('id').format(Math.round(result.pr1)) }}
                      </li>
                      <li>
                        Tingkat kenaikan produktivitas modal anda pada tahun {{ props.analysis.year }} belum dapat diukur
                        pada laporan pertama
                      </li>
                      <li>
                        Kenaikan Profitabilitas perusahaan tahun {{ props.analysis.year }} belum dapat diukur pada laporan
                        pertama
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="grid grid-rows-3 mt-2 gap-4">
                  <div style="height: 10em; width: 60%;" class="mx-auto">
                    <Bar :options="chartOptions1" :data="nilaiTambah" />
                  </div>
                  <div style="height: 10em; width: 60%;" class="mx-auto">
                    <Bar :options="chartOptions2" :data="produktivitas" />
                  </div>
                  <div v-if="!result.fy" style="height: 10em; width: 80%;" class="mx-auto">
                    <Bar :options="chartOptions3" :data="produktivitas_tenaga_kerja" />
                  </div>
                  <div v-else style="height: 10em" class="text-sm text-center py-12 text-red-800">
                    <p>
                      Kenaikan Produktivitas Belum bisa ditampilkan pada laporan pertama.
                    </p>
                  </div>
                </div>
                <div class="p-2 mt-4">
                  <p class="font-bold text-md ">Disclaimers:</p>
                  <ul class="list-disc text-sm">
                    <li>
                      Hasil pengukuran akan sangat tergantung dengan input data yang perusahaan masukan, semakin presisi
                      data
                      yang
                      dimasukkan, hasil akan semakin mendekati kebenaran
                    </li>
                    <li>
                      Data bersifat rahasia, hanya kebutuhan pengukuran dan data tidak akan digunakan untuk kepentingan
                      lain
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

const props = defineProps(["analysis"])

const modal = ref({
  show: false,
})

let authUser
if (process.client) {
  authUser = ref(JSON.parse(localStorage.getItem("auth")))
}

let nomorSertifikat = computed(() => {
  let nomor = props.analysis.id_laporan.replace(/\D/g, "")
  return nomor.slice(0, 5)
})

let result = props.analysis.result

let penilaian = computed(() => {
  if (result.pr1 < (58 * (10 ** 6))) {
    return "Sangat Rendah"
  } else if (result.pr1 >= 58 * (10 ** 6) && result.pr1 < (80 * (10 ** 6))) {
    return "Rendah"
  } else if (result.pr1 >= 80 * (10 ** 6) && result.pr1 < (100 * (10 ** 6))) {
    return "Sedang"
  } else if (result.pr1 >= 100 * (10 ** 6)) {
    return "Tinggi"
  }
})

import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import { ref } from 'vue';
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const produktivitas_tenaga_kerja = ref({
  labels: [props.analysis.year],
  datasets: [
    {
      label: 'Nilai Tambah / Jml Tenaga Kerja',
      backgroundColor: '#e41a1c',
      data: [result.kn1],
    },
    {
      label: 'Nilai Tambah / Jam Kerja',
      backgroundColor: '#377eb8',
      data: [result.kn2],
    },
    {
      label: 'Nilai Tambah / Biaya Tenaga Kerja',
      backgroundColor: '#4daf4a',
      data: [result.kn3],
    },
    {
      label: 'Biaya Tenaga Kerja / Total Jam Kerja',
      backgroundColor: '#ff7f00',
      data: [result.kn4],
    },
  ],
});

const produktivitas = ref({
  labels: [props.analysis.year],
  datasets: [
    {
      label: `Produktivitas ${props.analysis.year}`,
      backgroundColor: '#377eb8',
      data: [result.pr1],
      barThickness: 48
    },
  ],
})

const nilaiTambah = ref({
  labels: [props.analysis.year],
  datasets: [
    {
      label: `Nilai Tambah ${props.analysis.year}`,
      backgroundColor: '#377eb8',
      data: [result.nt],
      barThickness: 48
    }
  ],
})

const chartOptions1 = {
  responsive: true,
  maintainAspectRatio: false,
  devicePixelRatio: 4,
  plugins: {
    tooltip: {
      enabled: false
    },
    title: {
      text: "Nilai Tambah (Rupiah)",
      display: true,
      font: {
        size: 14,
        wight: 'bold'
      }
    },
    legend: {
      display: false,
      position: "right",
      maxWidth: 200,
      labels: {
        boxWidth: 12,
        font: {
          size: 10
        }
      }
    }
  },
  scales: {
    x: {
      border: {
        display: true
      },
      grid: {
        display: true,
        drawOnChartArea: false,
        drawTicks: false,
      }
    },
    y: {
      border: {
        display: true
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: false
      }
    }
  }
}

const chartOptions2 = {
  responsive: true,
  maintainAspectRatio: false,
  devicePixelRatio: 4,
  plugins: {
    tooltip: {
      enabled: false
    },
    title: {
      text: "Produktivitas (Rupiah)",
      display: true,
      font: {
        size: 14,
        wight: 'bold'
      }
    },
    legend: {
      display: false,
      position: "right",
      maxWidth: 200,
      labels: {
        boxWidth: 12,
        font: {
          size: 10
        }
      }
    }
  },
  scales: {
    x: {
      border: {
        display: true
      },
      grid: {
        display: true,
        drawOnChartArea: false,
        drawTicks: false,
      }
    },
    y: {
      border: {
        display: true
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: false
      }
    }
  }
}

const chartOptions3 = {
  responsive: true,
  maintainAspectRatio: false,
  devicePixelRatio: 4,
  plugins: {
    tooltip: {
      enabled: false
    },
    title: {
      text: "Kenaikan Pertumbuhan Produktivitas Tenaga Kerja (%)",
      display: true,
      font: {
        size: 14,
        wight: 'bold'
      }
    },
    legend: {
      display: true,
      position: "right",
      maxWidth: 200,
      labels: {
        boxWidth: 12,
        font: {
          size: 10
        }
      }
    }
  },
  scales: {
    x: {
      border: {
        display: true
      },
      grid: {
        display: true,
        drawOnChartArea: false,
        drawTicks: false,
      }
    },
    y: {
      border: {
        display: true
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: false
      }
    }
  }
}

const generatePDF = async () => {
  let title = `[example] Sertifikat_Produktivitas_${authUser.value.data.nama_perusahaan}_${props.analysis.year}.pdf`

  const htmlContent1 = document.getElementById('pdfContent1');
  const canvas = await html2canvas(htmlContent1, {
    scale: 1
  })

  const htmlContent2 = document.getElementById('pdfContent2')
  const canvas2 = await html2canvas(htmlContent2, {
    scale: 1
  })

  const doc = new jsPDF({
    orientation: "p",
    unit: 'mm',
    format: "a4"
  });

  doc.addImage(canvas, 'PNG', 0, 0);
  doc.addPage()
  doc.addImage(canvas2, 'PNG', 0, 0)

  doc.save(title);
}


</script>

<style scoped>
body {
  zoom: 1
}

.modal-overlay {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-left: 4%;
  justify-content: center;
  background-color: #000000da;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.pdf-content {
  background-image: url('../assets/Frame_Certificate.png');
  background-repeat: no-repeat;
  background-size: contain;
  /* background-position: center center; */
  /* Set your desired background color */
  height: 297mm;
  width: 210mm;
}

.pdf-content-2 {
  background-color: #f5e286;
  /* background-color: #fffff6; */
  /* background-color: #b1b116; */
  background-repeat: no-repeat;
  background-size: contain;
  /* background-position: center center; */
  /* Set your desired background color */
  height: 297mm;
  width: 210mm;
}

.emblem {
  margin-left: auto;
  margin-right: auto;
  margin-top: 3em;
  margin-bottom: 1em;
}

.qr-ttd {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  margin-top: 1.5em;
}

.content {
  padding: 3em 6em 3em;
}

.title {
  font-family: 'Times New Roman', Times, serif;
  text-align: center;
}

.title-text {
  font-size: 1em;
}

.normal-text {
  font-family: 'Times New Roman', Times, serif;
  font-size: 1em;
  text-align: center;
}

.nomor-sertif {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 1.25em;
  text-align: center;
  margin-top: 1.6em;
}

.perusahaan {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 2em;
  text-align: center;
  margin-top: 1.5em;
  line-height: 1.2;
  height: 2.5em;
}

.table,
td {
  border: 1px solid;
}

td {
  padding-bottom: 10px;
}

.content-2 {
  padding: 2em 3em 2em;
}

.header-2 {
  margin-left: auto;
  margin-right: auto;
  color: white;
  background-color: #c35752;
  border-radius: 10em;
  padding: 0em 1em 1em 1em;
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.4em;
  font-weight: 600;
  text-align: center;
}
</style>
