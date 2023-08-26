<template>
  <div class="h-full grid grid-cols-2 gap-12">
    <div class="max-w static rounded overflow shadow-lg bg-[#F6F6F6] card-border">
      <CardLabel label="Profil" />
      <div class="px-6 py-4 mt-2">
        <div class="font-bold text-xl mb-2">Profil Pengguna</div>
        <div class="flex gap-6">
          <InputField1 label="Nama" wide="300" type="text" disabled="true" value="Budi Budiman" />
          <InputField1 label="NIK" wide="300" type="number" disabled="true" value="1324568798456" />
        </div>
        <InputField1 label="Alamat" type="text" disabled="true"
          value="Jl. Tengah Raya No.XX, Tengah Baru, Ancol, Jakarta Utara" />
        <div class="flex gap-6">
          <InputField1 label="Email" wide="300" type="text" disabled="true" value="budibudiman@gmail.com" />
          <div class="mb-4" style="width: 300px">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="handphone">
              Nomor Handphone
            </label>
            <div class="shadow rounded">
              <input
                class="shadow-none appearance-none border border-r-1 border-r-gray-300 rounded-l w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="+62" disabled readonly style="width: 50px">
              <input
                class="shadow-none appearance-none border border-l-0 rounded-r w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="7895135135" disabled readonly id="handphone" style="width: 221px">
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Profil Perusahaan</div>
        <div class="flex gap-6">
          <InputField1 label="Nama Perusahaan" wide="300" type="text" disabled="true"
            value="PT. Indonesia Makmur Sejahtera" />
          <InputField1 label="Telpon" wide="300" type="number" disabled="true" value="0218798456" />
        </div>
        <InputField1 label="Alamat Perusahaan" type="text" disabled="true"
          value="Jl. Tengah Raya No.XX, Tengah Baru, Ancol, Jakarta Utara" />
        <InputField1 label="Email Perusahaan" wide="300" type="text" disabled="true" value="info@ims.co.id" />
      </div>
    </div>

    <div class="static grid grid-rows-2 gap-12">
      <div class="max-w static rounded overflow shadow-lg bg-[#F6F6F6] card-border">
        <div class="relative">
          <CardLabel label="Laporan" />
          <div class="absolute top-0 right-5">
            <a href="#"
              class=" inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-amber-400 rounded-b-md hover:bg-amber-600">
              Lihat Panduan
              <Icon name="fe:arrow-down" size="6mm" class="my-auto flex-none ml-2" />
            </a>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 p-4 mt-2 flex flex-col">
          <div class="col-span-1 grid grid-rows-2 gap-3">
            <div class="border">
              <div class="h-full bg-white border border-gray-200 shadow-sm">
                <p class="font-normal text-zinc-900 dark:text-gray-400 py-1 px-2">Jumlah Laporan</p>
                <div class="h-full border-t-2 grid grid-cols-2">
                  <div class="col m-2 h-full">
                    <p class="text-black">Selesai</p>
                    <p class="text-green-600 text-[24px] font-bold text-center">10</p>
                  </div>
                  <div class="col m-2 h-full">
                    <p class="text-black">Belum</p>
                    <p class="text-red-600 text-[24px] font-bold text-center">2</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-[80%] bg-white border border-gray-200 shadow-sm p-2 overflow flex flex-col">
              <p class="font-normal text-zinc-900 dark:text-gray-400 px-2">Total Revenue</p>
              <div class="grid grid-cols-3 flex content-end h-full">
                <div class="h-full col-span-2 flex">
                  <p class="text-[18px] font-bold text-center ml-2">Rp 20.4 M</p>
                </div>
                <div class="h-full col-span-1 flex content-end">
                  <span class="text-green-600  text-[18px] font-bold text-center my-auto">
                    <Icon name="fe:arrow-up" class="mb-1" />2%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-2 flex flex-col gap-3">
            <div class="row-span-5">
              <div class="h-full bg-white border border-gray-200 shadow-sm p-2 md:table-fixed">
                <p class="font-normal text-zinc-900 dark:text-gray-400 py-1 px-2">Riwayat Pelaporan</p>
                <table class="table-auto">
                  <thead>
                    <tr class="text-left">
                      <th class="w-[25%]">Tahun</th>
                      <th class="w-[60%]">Tanggal Lapor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm">
                    <tr>
                      <td>2018</td>
                      <td>5 Januari 2019</td>
                      <td>Diterima</td>
                    </tr>
                    <tr>
                      <td>2019</td>
                      <td>12 Februari 2020</td>
                      <td>Diterima</td>
                    </tr>
                    <tr>
                      <td>2020</td>
                      <td>29 Desember 2021</td>
                      <td>Revisi</td>
                    </tr>
                    <tr>
                      <td>2021</td>
                      <td>12 Januari 2022</td>
                      <td>Ditolak</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row-span-2 flex flex-row gap-16 justify-center content-end lg:">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full w-32 h-9">
                Tambah
              </button>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full w-32 h-9">
                Lihat
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w static rounded overflow shadow-lg bg-[#F6F6F6] card-border">
        <CardLabel label="Produktivitas" />
        <div class="grid grid-cols-2 gap-8 p-5 mt-2 h-[85%]">
          <div class="col-span-1 grid grid-rows-2 gap-6">
            <div class="row-span-1 border">
              <CardInfo label="Nilai Tambah Terakhir" value="4.8" rate="2" unit="M" />
            </div>
            <div class="row-span-1 border">
              <CardInfo label="Produktivitas tenaga kerja rata-rata terakhir" value="4.8" rate="2" unit="%" />
            </div>
          </div>
          <div class="col-span-1 grid grid-rows-2 gap-6">
            <div class="row-span-1 border">
              <CardInfo label="Produktivitas modal rata-rata terakhir" value="4.8" rate="1.2" unit="%" />
            </div>
            <div class="row-span-1 border">
              <CardInfo label="Produktivitas modal rata-rata terakhir" value="1.8" rate="-1.2" unit="%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


</script>

<style scoped>
.card-border {
  border: solid 1px #CCC9D4;
}
</style>