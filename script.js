const firebaseConfig = {
apiKey: "AIzaSyClRKoMDve6Kd41rQvLVvQ70jxyktCXo50",
authDomain: "blessedrealty-00001.firebaseapp.com",
projectId: "blessedrealty-00001",
storageBucket: "blessedrealty-00001.firebasestorage.app",
messagingSenderId: "484588805090",
appId: "1:484588805090:web:58647011e00daff15f77bb",
measurementId: "G-W4G2MCWP04"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

const akwaIbomLGAs = [
"Abak","Eastern Obolo","Eket","Esit Eket","Essien Udim","Etim Ekpo","Etinan","Ibeno","Ibesikpo Asutan","Ibiono Ibom","Ika","Ikono","Ikot Abasi","Ikot Ekpene","Ini","Itu","Mbo","Mkpat Enin","Nsit Atai","Nsit Ibom","Nsit Ubium","Obot Akara","Okobo","Onna","Oron","Oruk Anam","Udung Uko","Ukanafun","Uruan","Urue Offong/Oruko","Uyo"
];

const crossriversLGAs = [
"Port Harcourt","Obio-Akpor","Okrika","Ogu-Bolo","Eleme","Tai","Gokana","Khana","Oyigbo","Opobo-Nkoro","Andoni","Bonny","Ikot Abasi","Degema","Asari-Toru","Akuku-Toru","Abuad-Odual","Ahoada West","Ogba-Eghema-Ndoni","Emohua","Ikwerre","Etche","Omuma"];

  
function toggleMenu(){
document.getElementById('sidebar').style.left='0';
document.getElementById('overlay').style.display='block';
}

function closeMenu(){
document.getElementById('sidebar').style.left='-100%';
document.getElementById('overlay').style.display='none';
}

function toggleForm(id){
const box = document.getElementById(id);
box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function togglePackage(id){
const box = document.getElementById(id);
box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function showPayment(method,target){
const el = document.getElementById(target);

if(method === 'mobile'){
el.innerHTML = `
<div class='paymentDetails' style='display:block;'>
<h3>Mobile Transfer</h3>
<p><b>Bank Name:</b> ADD YOUR BANK NAME</p>
<p><b>Account Number:</b> ADD ACCOUNT NUMBER</p>
<p><b>Account Name:</b> ADD ACCOUNT NAME</p>
<button onclick='confirmPayment()'>I Have Made Payment</button>
</div>`;
}

if(method === 'onsite'){
el.innerHTML = `
<div class='paymentDetails' style='display:block;'>
<h3>On-site Payment</h3>
<p>Visit our office to complete your package payment physically.</p>
<input placeholder='Your Preferred Date'>
<button onclick='confirmPayment()'>Book Appointment</button>
</div>`;
}

if(method === 'card'){
el.innerHTML = `
<div class='paymentDetails' style='display:block;'>
<h3>Bank/Card Payment</h3>
<input id='emailPay' placeholder='Email Address'>
<button onclick='payWithPaystack()'>Pay Securely</button>
</div>`;
}
}

function payWithPaystack(){
let handler = PaystackPop.setup({
key: 'pk_test_b31dab6228843897c55e6ca13adf5b1ce20aed12',
email: document.getElementById('emailPay').value,
amount: 3000 * 100,
currency: 'NGN',
callback: function(response){
confirmPayment();
}
});
handler.openIframe();
}

function confirmPayment(){
const notice = document.getElementById('paymentNotification');
notice.style.display='block';
setTimeout(()=>{
notice.style.display='none';
},3000);
}

function submitInvestor(){
alert('Investor application submitted');
}

function submitPartner(){
alert('Partner application submitted');
}

function submitHiring(){
alert('Application submitted');
}

function toggleAI(){
const box = document.getElementById('aiBox');
box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function reply(){

let input = document.getElementById("userInput").value.toLowerCase();

let response = document.getElementById("response");

let res = "Sorry, I don't understand yet.";

if(input.includes("uyo")){
res = "Listings in Uyo available.";
}

if(input.includes("acropolis")){
res = "₦45B flagship smart infrastructure project.";
}

response.innerText = res;

}

function filterProperties(){

const state = document.getElementById('stateSelect').value;

const lga = document.getElementById('lgaSelect').value;

const type = document.getElementById('typeSelect').value;

const cards = document.querySelectorAll('.propertyCard');

const lgaSelect = document.getElementById('lgaSelect');

lgaSelect.innerHTML =
'<option value="all">Select Local Government Area</option>';

if(state === 'akwaibom'){

akwaIbomLGAs.forEach(area => {

const option = document.createElement('option');

option.value = area.toLowerCase();

option.textContent = area;

lgaSelect.appendChild(option);

});

}

cards.forEach(card => {

let show = true;

if(state !== 'all' && card.dataset.state !== state){
show = false;
}

if(lga !== 'all' && card.dataset.lga !== lga){
show = false;
}

if(type !== 'all' && card.dataset.type !== type){
show = false;
}

card.style.display = show ? 'block' : 'none';

});

}
