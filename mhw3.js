
//funzioni per il token petfinder

function getToken(json)
{
	token_data = json;
	console.log(token_data);
	generacani();
}

function onTokenResponse(response) {
  return response.json();
};

//secret e endpoint petfinder
const key_petfinder = 'xG9iveCr280opWH0JeyvHGTyYfM6Pv8mGqr3mFRpbCbrlfnDi4'
const secret_petfinder = 'lrJTdTDNzv88sgNnMY2DX9fKwRn23EerfhUG0ZEI'
const pet_api_endpoint_token = 'https://api.petfinder.com/v2/oauth2/token' 
const pet_api_endpoint = 'https://api.petfinder.com/v2/animals' 


let token_data;
fetch(pet_api_endpoint_token,
{
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key_petfinder + '&client_secret=' + secret_petfinder,
	headers:
	{
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}
).then(onTokenResponse).then(getToken);



function generacani()
{const status = 'adoptable'
fetch('https://api.petfinder.com/v2/animals?type=dog&status=' + status, 
			{
				headers: {
					'Authorization': token_data.token_type + ' ' + token_data.access_token,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(onResponse).then(onjsonpet);

		}

function onjsonpet(json)
{
console.log(json);
const adoptspace = document.querySelector('.immadopt');
adoptspace.innerHTML='';

const results = json.animals
const num_results = 3;

if(results.length == 0)
{
  const errore = document.createElement("h1"); 
  const messaggio = document.createTextNode("Al momento nessuno dei nostri cuccioli ha bisogno di aiuto, ritorna più tardi!"); 
  errore.appendChild(messaggio); 
  adoptspace.appendChild(errore);
}

let i = 0;
for (const result of results){
if(result.primary_photo_cropped != null && i<num_results)
	{
		const immagine = result.primary_photo_cropped.small;
		const boxdog = document.createElement('div');
		const img = document.createElement('img');
		img.src = immagine;
		const breed = document.createElement('h3');
		breed.textContent = result.breeds.primary;
		const info = document.createElement('a');
		info.href = result.url;
		info.textContent = 'più info'
		info.classList.add('coll')
		boxdog.appendChild(img);
		boxdog.appendChild(breed);
		boxdog.appendChild(info);
		adoptspace.appendChild(boxdog);
		i++;

}
}
}


function onResponse(response)
{
	console.log(response);
	return response.json();
};

function onJsonimm(json)
{	
	console.log(breed);
	console.log(json);
	const immagine = json.message;
	const boxes = document.querySelectorAll('.boxart');
	for (const box of boxes)
	{
		if (box.dataset.breed === breed)
		{	
			const immspace = box.querySelector('.boximm');
			immspace.innerHTML='';
			const img = document.createElement('img');
    		img.src = immagine;
			immspace.appendChild(img);
		}

	}
	
	
}

// funzione per cambiare foto in ogni articolo 

let breed;
function cambioFoto(event)
{
const box = event.currentTarget;
breed = box.dataset.breed;

fetch("https://dog.ceo/api/breed/" + breed + "/images/random").then(onResponse).then(onJsonimm);



}


const buttons = document.querySelectorAll('button');
for( const button of buttons)
{
    button.addEventListener('click',cambioFoto);
}
