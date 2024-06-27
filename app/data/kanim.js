export const kanim = [
  {
    nama: "Location A",
    kota: "Jakarta",
    alamat:
      "UNIT LAYANAN PASPOR, MIKO MALL, JL. KOPO NO. 599 KECAMATAN BANDUNG",
    isBiasa: true,
    isElektronik: false,
    isPolikarbonat: false,
    path: "path/to/image/locationA.jpg",
    jarak: 10,
    reguler: [
      {
        3: [
          {
            1: {
              kuota: 28,
              waktu: ["10:00-11:00", "12:00-13:00"],
            },
          },
          {
            2: {
              kuota: 5,
              waktu: ["13:00-14:00", "14:00-15:00"],
            },
          },
        ],
      },
    ],
    percepatan: [
      {
        3: [
          {
            1: {
              kuota: 60,
              waktu: ["10:00-11:00", "12:00-13:00"],
            },
          },
          {
            2: {
              kuota: 70,
              waktu: ["14:00-15:00", "15:00-16:00"],
            },
          },
        ],
      },
    ],
  },
  {
    nama: "Location B",
    kota: "Jakarta",
    alamat:
      "UNIT LAYANAN PASPOR, MIKO MALL, JL. KOPO NO. 599 KECAMATAN BANDUNG",
    isBiasa: true,
    isElektronik: true,
    isPolikarbonat: false,
    path: "path/to/image/locationB.jpg",
    jarak: 15,
    reguler: [
      {
        3: [
          {
            1: {
              kuota: 20,
              waktu: ["09:00-10:00", "11:00-12:00"],
            },
          },
          {
            3: {
              kuota: 10,
              waktu: ["13:00-14:00", "15:00-16:00"],
            },
          },
        ],
      },
    ],
    percepatan: [
      {
        3: [
          {
            2: {
              kuota: 50,
              waktu: ["09:00-10:00", "10:00-11:00"],
            },
          },
          {
            4: {
              kuota: 80,
              waktu: ["12:00-13:00", "13:00-14:00"],
            },
          },
        ],
      },
    ],
  },
  {
    nama: "Location C",
    kota: "Bandung",
    alamat:
      "UNIT LAYANAN PASPOR, MIKO MALL, JL. KOPO NO. 599 KECAMATAN BANDUNG",
    isBiasa: true,
    isElektronik: true,
    isPolikarbonat: true,
    path: "path/to/image/locationC.jpg",
    jarak: 50,
    reguler: [
      {
        3: [
          {
            5: {
              kuota: 30,
              waktu: ["08:00-09:00", "10:00-11:00"],
            },
          },
          {
            6: {
              kuota: 15,
              waktu: ["12:00-13:00", "14:00-15:00"],
            },
          },
        ],
      },
    ],
    percepatan: [
      {
        3: [
          {
            7: {
              kuota: 40,
              waktu: ["09:00-10:00", "11:00-12:00"],
            },
          },
          {
            8: {
              kuota: 70,
              waktu: ["13:00-14:00", "15:00-16:00"],
            },
          },
        ],
      },
    ],
  },
];
