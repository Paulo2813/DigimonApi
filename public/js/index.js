import { API_URL } from "../settings/environment.js";

async function mostrarDigimons(page){
   try {
    const res = await fetch(`${API_URL}${page}`)
    if(!res.ok)return;
    const data = await res.json()
    const contenedor = document.getElementById('card')
    contenedor.innerHTML = ''; 
    data.content.forEach(digimon =>{
        const item = document.createElement('div')
        item.innerHTML = `
        <p>${digimon.name}</p>
        <img src="${digimon.image}"/>
        <a href="${digimon.href}" target="_blank">+Info</a>
        `
        contenedor.appendChild(item)
    })
    
   } catch (error) {
    console.error("Peticion no procesada")
    
   }

}

function pagination(){
    const page2 = document.getElementById('pagina')
    const bottonAtras = document.getElementById('atras')
    const bottonAdelante = document.getElementById('adelante')
    
    let  currentPage = 0;
    const totalPages = 291;

    mostrarDigimons(currentPage);
    page2.textContent = `${currentPage}`

    function updateButtonVisibility() {
        if (currentPage <= 0) {
            bottonAtras.classList.add('hidden');
        } else {
            bottonAtras.classList.remove('hidden');
        }

        if (currentPage >= totalPages) {
            bottonAdelante.classList.add('hidden');
        } else {
            bottonAdelante.classList.remove('hidden');
        }
    }

    updateButtonVisibility();
    bottonAtras.addEventListener('click',()=>{
        if(currentPage>0){
            currentPage-=1;
            page2.textContent = `${currentPage}`
            mostrarDigimons(currentPage);
            updateButtonVisibility();
        }else{
            alert("no puedes retroceder más genio")
        }
    });

    bottonAdelante.addEventListener('click',()=>{
        if(currentPage<totalPages){
            currentPage+=1;
            page2.textContent = `${currentPage}`
            mostrarDigimons(currentPage);
            updateButtonVisibility();
        }else{
            alert("llegaste al fin")
        }


    });

}

pagination()

const audio = document.getElementById('miAudio');
const botonAudio = document.getElementById('botonMute');
const iconoSonido = document.getElementById('iconoSonido'); 



botonAudio.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        iconoSonido.classList.replace('fa-volume-mute', 'fa-volume-up');
    } else {
        audio.muted = true;
        iconoSonido.classList.replace('fa-volume-up', 'fa-volume-mute'); 
    }
});



