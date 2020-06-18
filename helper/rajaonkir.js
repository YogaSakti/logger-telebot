const fetch = require('node-fetch')

const cekResi = (courier, waybill) => new Promise(async (resolve, reject) => {
  const opts = {
    method: 'POST',
    headers: {
      key: 'e079daba710176abe3c4e8edf375cb8e',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams([['waybill', waybill], ['courier', courier]])
  }

  fetch('https://pro.rajaongkir.com/api/waybill', opts)
    .then(res => res.json())
    .then(result => {
      // console.log(result.rajaongkir)
      resolve(result.rajaongkir)
    })
    .catch(err => reject(err))
})
module.exports = { cekResi }
