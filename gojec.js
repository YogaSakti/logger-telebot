const fetch = require('node-fetch');
const uuidv4 = require('uuid/v4');
var uuid = uuidv4();

const accessToken = process.env.accessTokenGojec;

const genUniqueId = length =>
	new Promise((resolve, reject) => {
		var text = "";
		var possible =
			"abcdefghijklmnopqrstuvwxyz1234567890";
		for (var i = 0; i < length; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		resolve(text);
	});


const getqr = (accessToken, uuid, uniqid, phoneNumber) => new Promise((resolve, reject) => {
	const url = `https://api.gojekapi.com/wallet/qr-code?phone_number=%2B${phoneNumber}`;

	fetch(url, {
			method: 'GET',
			headers: {
				'X-Session-ID': uuid,
				'Accept': 'application/json',
				'X-Platform': 'Android',
				'X-UniqueId': uniqid,
				'X-AppVersion': '3.34.1',
				'X-AppId': 'com.gojek.app',
				'X-PhoneModel': 'Android,Custom Phone - 6.0.0 - API 23 - 768x1280',
				'X-PushTokenType': 'FCM',
				'X-DeviceOS': 'Android,6.0',
				Authorization: `Bearer ${accessToken}`,
				'Accept-Language': 'en-ID',
				'X-User-Locale': 'en_ID',
				'Content-Type': 'application/json; charset=UTF-8',
				'User-Agent': 'okhttp/3.12.1'
			}
		})
		.then(res => res.json())
		.then(result => {
			resolve(result)
		})
		.catch(err => {
			reject(err)
		})
});

const trnsfr = (accessToken, uuid, uniqid, qrid) => new Promise((resolve, reject) => {
	const url = `https://api.gojekapi.com/v2/fund/transfer`;

	// JANGAN LUPA JUMLAH SALDO YANG AKAN DI TF 
	const boday = {
		"amount": "1",
		"description": "💰",
		"qr_id": `${qrid}`
	};

	fetch(url, {
			method: 'POST',
			headers: {
				'X-Session-ID': uuid,
				'Accept': 'application/json',
				'X-Platform': 'Android',
				'X-UniqueId': uniqid,
				'X-AppVersion': '3.34.1',
				'X-AppId': 'com.gojek.app',
				'X-PhoneModel': 'Android,Custom Phone - 6.0.0 - API 23 - 768x1280',
				'X-PushTokenType': 'FCM',
				'X-DeviceOS': 'Android,6.0',
				Authorization: `Bearer ${accessToken}`,
				'Accept-Language': 'en-ID',
				'X-User-Locale': 'en_ID',
				'Content-Type': 'application/json; charset=UTF-8',
				'User-Agent': 'okhttp/3.12.1',
				pin: '##################' // PIN AKUN UTAMA
			},
			body: JSON.stringify(boday)
		})
		.then(res => res.json())
		.then(result => {
			resolve(result)
		})
		.catch(err => {
			reject(err)
		})
});


async function doStuff(Number) {
	const uniqueid = await genUniqueId(16);
	const qrid = await getqr(accessToken, uuid, uniqueid, Number)
	const kirimsaldo = await trnsfr(accessToken, uuid, uniqueid, qrid.data.qr_id)
	return kirimsaldo
}
module.exports.doStuff = doStuff;