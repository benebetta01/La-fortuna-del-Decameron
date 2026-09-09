document.addEventListener('DOMContentLoaded', () => {
  showSlides();
});

/*SLIDESHOW*/
let slideIndex = 0;
var timeoutSlides = null;
var timeoutDuration = 3 * 1000;

/*posso richiamare la funzione showSlides perché l'ho messa all'inizio*/
function showSlides() {
  // Seleziona tutti gli elementi con la classe slide
  const slides = document.querySelectorAll('.mySlides');

  /*
  console.log("typeof slides: " + typeof slides);
  console.log("slides: " + JSON.stringify(slides));
  */

  // Rimuove la classe active da tutte le slide
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  let dots = document.querySelectorAll(".dot");

  // Rimuove la classe active da tutti i dot
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  if(slides.length > 0) {
  
    slideIndex++;//se arrivo all'ultima slide, mi torna alla prima
    if (slideIndex > slides.length) {slideIndex = 1}    

    slides[slideIndex-1].classList.add("active");  //la slide -1 è la slide 0, cioè la prima (si numerano 0, 1, 2)
    dots[slideIndex-1].classList.add("active");

    timeoutSlides = setTimeout(showSlides, timeoutDuration); //durata del timer delle slides
  }
}

/*la funzione plusSlides l'ho messa direttamente nel file index, con i button prev e next*/
function plusSlides(direction) {
  clearTimeout(timeoutSlides); //annullo il timer perché cliccando sul bottone si cambia slide e si riazzera

  // Seleziona tutti gli elementi con la classe slide
  const slides = document.querySelectorAll('.mySlides');

  // Rimuove la classe active da tutte le slide
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  let dots = document.querySelectorAll(".dot");

  // Rimuove la classe active da tutti i dot
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  slideIndex += direction; //la slide successiva dipende dalla direzione in cui voglio andare premendo prev o next
  if (slideIndex > slides.length) {slideIndex = 1} //se la slide supera la lenght (3 slides), allora torno alla slide 1
  if (slideIndex < 1) {slideIndex = slides.length}    

  slides[slideIndex-1].classList.add("active");  
  dots[slideIndex-1].classList.add("active");

  timeoutSlides = setTimeout(showSlides, timeoutDuration); //reimposto il timer 
}

/*FINE SLIDESHOW*/

/*INIZIO BREADCRUMBS AUTOMATICI*/
document.addEventListener("DOMContentLoaded", function () {
  const breadcrumbList = document.getElementById('breadcrumb-list');
  if (!breadcrumbList) return;

  // Ottieni la pagina corrente
  const path = window.location.pathname;
  const currentPage = path.substring(path.lastIndexOf('/') + 1) || "index.html";

  // Ricava il titolo dell'item dalla pagina corrente (usato nel breadcrumb
  // al posto della dicitura generica "Item")
  function getItemTitle() {
    const dcTitleMeta = document.querySelector('meta[name="DC.title"], meta[name="DC.Title"]');
    if (dcTitleMeta && dcTitleMeta.content) return dcTitleMeta.content;
    const h2 = document.querySelector('.maincolumn h2');
    if (h2) return h2.textContent.trim();
    return "Item";
  }

  // Se siamo su item.html, salviamo il titolo per riusarlo anche
  // nel breadcrumb della mappa, se ci si arriva da qui
  if (currentPage === "item.html") {
    sessionStorage.setItem("lastItemTitle", getItemTitle());
  }

  // Salviamo la pagina precedente in sessionStorage se non siamo già sulla mappa
  if (currentPage !== "map.html") {
    sessionStorage.setItem("lastPage", currentPage);
  }

  const previousPage = sessionStorage.getItem("lastPage") || "";
  const referrer = document.referrer;

  // Base comune
  let breadcrumbs = [{ name: "Home", link: "index.html" }];

  // 1. Pagina Lista / Catalogo
  if (currentPage === "list-items.html") {
    breadcrumbs.push({ name: "Catalogo", link: null });
  }

  // 2. Pagina dettaglio Item
  else if (currentPage === "item.html") {
    breadcrumbs.push({ name: "Catalogo", link: "list-items.html" });
    breadcrumbs.push({ name: getItemTitle(), link: null });
  }

  // 3. Pagina Dati
  else if (currentPage === "data.html") {
    breadcrumbs.push({ name: "Dati", link: null });
  }

  // 4. Pagina Mappa
  else if (currentPage === "map.html") {
    const cameFromItem = previousPage.includes("item.html") || referrer.includes("item.html");
    const cameFromList = previousPage.includes("list-items.html") || referrer.includes("list-items.html");

    if (cameFromItem) {
      breadcrumbs.push({ name: "Catalogo", link: "list-items.html" });
      const lastItemTitle = sessionStorage.getItem("lastItemTitle") || "Item";
      breadcrumbs.push({ name: lastItemTitle, link: "item.html" });
    } else if (cameFromList) {
      breadcrumbs.push({ name: "Catalogo", link: "list-items.html" });
    }

    breadcrumbs.push({ name: "Mappa dei luoghi", link: null });
  }

  // Genera l'HTML del Breadcrumb
  breadcrumbList.innerHTML = breadcrumbs.map(item => {
    if (item.link) {
      return `<li><a href="${item.link}">${item.name}</a></li>`;
    } else {
      return `<li>${item.name}</li>`;
    }
  }).join("");
});
/*FINE BREADCRUMBS AUTOMATICI*/



/*LIST_ITEMS*/
/*FILTER*/
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (c === "" || x[i].classList.contains(c)) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
if (btnContainer) {
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
}

/*FINE FILTER*/

/*per ordinare le cards in ordine alfabetico a livello di list-item*/
function sortCards(order) {
  // 1. Seleziona il contenitore principale delle card
  const container = document.querySelector('.rightcolumn .container');
  
  // 2. Recupera tutti gli elementi con classe filterDiv (le singole card)
  const cards = Array.from(container.getElementsByClassName('filterDiv'));

  // 3. Ordina l'array in base al testo contenuto nel tag <h4>
  cards.sort((a, b) => {
    const titleA = a.querySelector('h4').textContent.trim().toLowerCase();
    const titleB = b.querySelector('h4').textContent.trim().toLowerCase();

    if (order === 'asc') {
      return titleA.localeCompare(titleB, 'it'); // Ordine A-Z
    } else if (order === 'desc') {
      return titleB.localeCompare(titleA, 'it'); // Ordine Z-A
    }
  });

  // 4. Mantiene la paginazione alla fine eliminandola temporaneamente prima dell'inserimento
  const pagination = container.querySelector('.pagination')?.parentNode;

  // 5. Reinserisce le card ordinate nel DOM
  cards.forEach(card => container.appendChild(card));

  // 6. Riposiziona la paginazione in fondo
  if (pagination) {
    container.appendChild(pagination);
  }
}

/*fine ordine alfabetico*/

/*EVIDENZIA IL FILTRO SELEZIONATO - leftcolumn (riordina / filtra)*/
document.querySelectorAll('.leftcolumn > div').forEach(function (group) {
  // Considera solo i div che contengono effettivamente dei pulsanti .btn
  const buttons = group.querySelectorAll(':scope > a.btn');
  if (buttons.length === 0) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      // Evita il salto in cima alla pagina per i link con href="#"
      if (btn.getAttribute('href') === '#') {
        event.preventDefault();
      }
      // Rimuove "active" dagli altri pulsanti dello stesso gruppo e lo aggiunge a quello cliccato
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
});
/*FINE EVIDENZIAZIONE leftcolumn*/

/*EVIDENZIA IL FILTRO SELEZIONATO - rightcolumn (giornate / novelle)*/
(function () {
  const btnContainer = document.getElementById('myBtnContainer');
  if (!btnContainer) return;

  function clearActiveStates() {
    btnContainer.querySelectorAll('.dropbtn.active').forEach(function (el) {
      el.classList.remove('active');
    });
    btnContainer.querySelectorAll('.dropdown-content a.active').forEach(function (el) {
      el.classList.remove('active');
    });
  }

  btnContainer.addEventListener('click', function (event) {
    const novellaLink = event.target.closest('.dropdown-content a');
    const dropbtn = event.target.closest('.dropdown > .dropbtn');

    if (novellaLink) {
      // Cliccata una novella dentro una tendina: resta evidenziata lei
      // e viene evidenziata anche la Giornata a cui appartiene
      clearActiveStates();
      novellaLink.classList.add('active');
      const parentDropbtn = novellaLink.closest('.dropdown').querySelector('.dropbtn');
      if (parentDropbtn) parentDropbtn.classList.add('active');
    } else if (dropbtn && !dropbtn.classList.contains('giorno-btn')) {
      // Cliccato il pulsante "Show all" (le Giornate non hanno azione al click,
      // si aprono solo al passaggio del mouse)
      clearActiveStates();
      dropbtn.classList.add('active');
    }
  });
})();
/*FINE EVIDENZIAZIONE rightcolumn*/
