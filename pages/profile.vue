<template>
  <div class="grid grid-cols-2 gap-12 profile-page">
    <div class="max-w static rounded overflow shadow-lg bg-[#F6F6F6] card-border">
      <CardLabel label="Profil Perusahaan" />
      <div class="px-6 py-4 mt-2">
        <InputField1 label="Nama Perusahaan" wide="480" type="text" disabled="true"
          value="PT. Indonesia Makmur Sejahtera" />
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Telpon/Fax">
            Telpon/Fax
          </label>
          <div class="rounded">
            <input
              class="shadow appearance-none border border-r-1 border-r-gray-300 rounded-l w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              value="+62" disabled readonly type="text" style="width: 50px">
            <input
              class="shadow appearance-none border border-l-0 rounded-r w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              value="7895135135" disabled readonly type="text" style="width: 430px" id="Telpon/Fax">
          </div>
        </div>
        <InputField1 label="Nama Pimpinan" wide="480" type="text" disabled="true" value="Budi Budiman" />

        <InputField1 label="Alamat Perusahaan" type="text" disabled="true"
          value="Jl. Tengah Raya No.XX, Tengah Baru, Ancol, Jakarta Utara" />
        <InputField1 label="Alamat Pabrik" type="text" disabled="true"
          value="Jl. Tengah Raya No.XX, Tengah Baru, Ancol, Jakarta Utara" />

        <div class="flex gap-6">
          <InputField1 label="Email Perusahaan" wide="300" type="text" disabled="true" value="info@ims.co.id" />
          <InputField1 label="Tanggal Pendirian" wide="300" type="text" disabled="true" value="06 Februari 1987" />
        </div>

        <div class="flex gap-6">
          <InputField1 label="Website Perusahaan" wide="400" type="text" disabled="true" value="www.ims.co.id" />
          <button
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold text-sm py-1 px-4 rounded-full w-36 h-9 mt-7">
            Bidang Usaha
          </button>
        </div>

      </div>
    </div>

    <div class="static grid grid-rows-2 gap-12">
      <div class="max-w static rounded overflow shadow-lg bg-[#F6F6F6] card-border">
        <div class="relative">
          <CardLabel label="Profil User" />
        </div>
        <div class="px-6 py-4 mt-2">
          <InputField1 label="Nama Perusahaan" type="text" disabled="true" value="PT. Indonesia Makmur Sejahtera" />
          <InputField1 label="Pemiliki Perusahaan" type="text" disabled="true" value="Budi Budiman" />
          <InputField1 label="Nama Pimpinan" type="text" disabled="true" value="Budi Budiman" />
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nmr">
              Nomor Handphone
            </label>
            <div class="rounded">
              <input
                class="shadow appearance-none border border-r-1 border-r-gray-300 rounded-l w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="+62" disabled readonly style="width: 50px">
              <input
                class="shadow appearance-none border border-l-0 rounded-r w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="7895135135" disabled readonly style="width: 90%" id="nmr">
            </div>
          </div>
        </div>

      </div>
      <div class="max-w static overflow">
        <div class="row-span-2 flex flex-row gap-16 justify-center content-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full w-32 h-9">
            Edit
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full w-32 h-9">
            Cancel
          </button>
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

.card-border {
  max-height: 85vh;
}
</style>