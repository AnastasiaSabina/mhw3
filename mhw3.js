// DA FINIRE 

function onJson_events(json){
    console.log('Json ricevuto');
    console.log(json);
    
    const library = document.querySelector('#g');
    library.innerHTML = '';

    if (json.status === 404) {
    const errore = document.createElement("h1"); 
    const messaggio = document.createTextNode(json.detail); 
    errore.appendChild(messaggio); 
    library.appendChild(errore);
    return
    } 
    // Leggi il numero di risultati
    const results = json.events
    
    if(results.length === 0)
    {
      const errore = document.createElement("h1"); 
      const messaggio = document.createTextNode("Nessun risultato!"); 
      errore.appendChild(messaggio); 
      library.appendChild(errore);
    }
  
    // Processa ciascun risultato
    for(result of results)
  {
    // Leggiamo info
	console.log(result);
	if(result.primary_photo_cropped != null)
	{
        album.classList.add('album');
		const image= document.createElement('img');
		image.src = img;
		const paragrafo = document.createElement('h2');
	
		// Aggiungiamo immagine e didascalia al div
		album.appendChild(image);
		album.appendChild(paragrafo);
		// Aggiungiamo il div alla libreria
		library.appendChild(album);
    }
}
}

function onJson_products(json){
    console.log('Json ricevuto');

 const library = document.querySelector('#g');
library.innerHTML = '';
const results_value= encodeURIComponent(library.value);
console.log('Eseguo la ricerca:' + results_value);
const risultato= json.makeup.length;
if( makeup.length === 0)
{
const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode("Nessun risultato!"); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
  }

for (let i=0; i<risultato; i++){
    const makeup= json.makeup[i];
    if (makeup.strMakeup === results_value){
        const type= json.strMakeup;
        const img= results.strMakeupThumb;
        const elemento= document.createElement('div');
        elemento.classList.add('brand');
        const image= document.createElement('img');
        image.src=img;
        const name= document.createElement('h1');
        const price=document.createElement('p');
        paragrafo.createTextNode= type;
        elemento.appendChild(image);
        elemento.appendChild(name);
        elemento.appendChild(price);

        const view= document.querySelector('#album-view');
        view.appendChild(elemento);

    }
}

}

function onResponse(response) { 
    console.log('Risposta ricevuta');
    return response.json();
  }
 


//funzione di ricerca 
function search(event){
    event.preventDefault();

    const brand_name= document.querySelector('#content').value;
    console.log(brand_name);

if(brand_name !== null) {
    const testo= encodeURIComponent(brand_name);
    console.log('Eseguo ricerca elementi riguardanti: ' + testo);

    const type= document.querySelector('#tipo').value;
    console.log('Ricerco elementi di tipo: ' +type);

    if (type === "products")
    {
        //esegui la richiesta GET dell'api Makeup 
   const products_request= makeup_api_endpoint + '?brand='+ testo + '&product_type='+ type;
    fetch(products_request).then(onResponse).then(onJson_products); 
    }
   
    else if (type === "events") {
        //esegui la richiesta dell'api OAuth2.0
        fetch('endpoint_events',
        {
             headers: 

            {
                'Authorization': 'Bearer' + 'WQDVJP4BN3P5OMFNNUGU' ,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            }) .then(onResponse).then(onJson_events);
}
else {
    alert("Inserisci il testo per cui effettuare la ricerca");
}	
}}

//Key and secret for OAuth2.0 
const key_events= 'XYABKKOXV4U7VEIVB3'
const secret_events= '632ZXLKC4EI6YOTUHIYRJNRL4JTXFPRNV4U7V3EYWOZYLJRVPJ'
const endpoint_token= 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=XYABKKOXV4U7VEIVB3&redirect_uri=https://www.eventbriteapi.com/v3/users/me/?token=WQDVJP4BN3P5OMFNNUGU'
const endpoint_events= 'https://www.eventbriteapi.com/v3/users/me/?token=WQDVJP4BN3P5OMFNNUGU'


//Keys and endpoints for Makeup_API
const makeup_api_endpoint= 'http://makeup-api.herokuapp.com/api/v1/products.json' 




// richiediamo il token
let token_data;
fetch(endpoint_token,
{
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key_events + '&client_secret=' + secret_events,
	headers:

	{

        'Content-Type': 'application/x-www-form-urlencoded'

	}
}

).then(onTokenResponse).then(getToken);


function getToken(json)
{
	token_data = json;
	console.log(json);
}


function onTokenResponse(response) {
  return response.json();
}

  // MODALE //
const PHOTO_LIST= [

    '/Users/anastasiasabina/Desktop/mhw3/photo_image1.jpeg',
   '/Users/anastasiasabina/Desktop/mhw3/photo_image3.svg', 
   '/Users/anastasiasabina/Desktop/mhw3/photo_image2.png', 
    '/Users/anastasiasabina/Desktop/mhw3/photo_image15.jpeg',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image4.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image6.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image7.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image9.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image8.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image11.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image10.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image12.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image13.png',
    '/Users/anastasiasabina/Desktop/mhw3/photo_image14.png',
   '/Users/anastasiasabina/Desktop/mhw3/photo_image5.png'
    
];
    
function createImage(src){

    const image= document.createElement('img');
    image.src= src;
    return image;
}

const albumView= document.querySelector('#album-view');
for(let i=0; i<PHOTO_LIST.length; i++){
    const photoSrc=PHOTO_LIST[i];
    const image= createImage(photoSrc);
    image.addEventListener('click', onThumbnailClick);
    albumView.appendChild(image);
}

function onThumbnailClick(event) {
    const image= createImage(event.currentTarget.src);
    document.body.classList.add('no-scroll');
    modalView.style.top=window.pageYOffset + 'px';
    modalView.appendChild(image);
    modalView.classList.remove('hidden');
}

function onModalClick(){
    document.body.classList.remove('no-scroll');
    modalView.classList.add('hidden');
    modalView.innerHTML='';
}
const modalView= document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);


const form= document.querySelector('form'); 
form.addEventListener('submit', search); 

